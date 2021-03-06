package db

import (
	"database/sql"
	"fmt"
	baseLog "log"
	"os"
	"time"

	gormLogger "gorm.io/gorm/logger"

	"github.com/pkg/errors"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"

	"github.com/squaaat/nearsfeed/api/internal/config"
	_const "github.com/squaaat/nearsfeed/api/internal/const"
)

type Client struct {
	DB     *gorm.DB
	Config *Config
}

type Config struct {
	Env      string
	Username string
	Password string
	Host     string
	Port     string
	Schema   string
	Dialect  string
}

func ParseConfig(cfg *config.Config) *Config {
	return &Config{
		Username: cfg.ServiceDB.Username,
		Password: cfg.ServiceDB.Password,
		Host:     cfg.ServiceDB.Host,
		Port:     cfg.ServiceDB.Port,
		Schema:   cfg.ServiceDB.Schema,
		Dialect:  cfg.ServiceDB.Dialect,
		Env:      cfg.App.Env,
	}
}

func New(cfg *Config) (*Client, error) {
	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)"+
			"/%s"+
			"?charset=utf8mb4&parseTime=True&loc=Local",
		cfg.Username,
		cfg.Password,
		cfg.Host,
		cfg.Port,
		cfg.Schema,
	)

	var defaultLogger gormLogger.Interface
	if cfg.Env == _const.EnvAlpha {
		defaultLogger = gormLogger.New(
			baseLog.New(os.Stdout, "\r\n", baseLog.LstdFlags),
			gormLogger.Config{
				SlowThreshold: time.Second,     // Slow SQL threshold
				LogLevel:      gormLogger.Info, // Log level
				Colorful:      true,            // Disable color
			},
		)
	} else {
		defaultLogger = gormLogger.Default
	}

	db, err := gorm.Open(
		mysql.New(mysql.Config{
			DSN:        dsn,
			DriverName: cfg.Dialect,
		}),
		&gorm.Config{
			NamingStrategy: schema.NamingStrategy{
				TablePrefix:   "j_", // table name prefix, table for `User` would be `t_users`
				SingularTable: true, // use singular table name, table for `User` would be `user` with this option enabled
			},
			Logger: defaultLogger,
		},
	)
	if err != nil {
		return nil, err
	}
	sqlDB, err := db.DB()
	sqlDB.SetMaxIdleConns(1)
	sqlDB.SetMaxOpenConns(10)
	sqlDB.SetConnMaxLifetime(time.Second)

	return &Client{
		DB:     db,
		Config: cfg,
	}, nil
}

func CreateDB(env string, cfg *config.ServiceDBConfig) error {
	if env != _const.EnvAlpha {
		return errors.New("Clean command only accept 'alpha' env")
	}

	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/"+
			"?charset=utf8mb4&parseTime=True&loc=Local",
		cfg.Username,
		cfg.Password,
		cfg.Host,
		cfg.Port,
	)

	db, err := sql.Open(cfg.Dialect, dsn)
	if err != nil {
		return err
	}
	defer db.Close()

	_, err = db.Exec(fmt.Sprintf("CREATE DATABASE %s CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;", cfg.Schema))
	if err != nil {
		return err
	}
	return nil
}

func DropDB(env string, cfg *config.ServiceDBConfig) error {
	if env != _const.EnvAlpha {
		return errors.New("Clean command only accept 'alpha' env")
	}

	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/"+
			"?charset=utf8mb4&parseTime=True&loc=Local",
		cfg.Username,
		cfg.Password,
		cfg.Host,
		cfg.Port,
	)

	db, err := sql.Open(cfg.Dialect, dsn)
	if err != nil {
		return err
	}
	defer db.Close()

	_, err = db.Exec(fmt.Sprintf("DROP DATABASE %s;", cfg.Schema))
	if err != nil {
		return err
	}
	return nil
}
