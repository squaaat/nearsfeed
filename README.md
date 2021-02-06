# jeonong

프로젝트 전농.

- 전농동 출신이 시작한 프로젝트, 전농동에 내집마련으로 경제적 자유를 얻고싶은 마음에 시작한 프로젝트
- 전농동 대장아파트 34평 기준 18억 미친거아닙니까. 옛날엔 그 지역 주택 3억이었는데..
- 지역기반의 할인정보를 모아 보여주는 서비스

# Scripts

### secrets 환경변수

- create
  SSM 에 값 생성하기

```bash
./scripts/secrets/create.sh -r ap-northeast-2 -a jeonong-api -e alpha
```

- printout
  SSM 에 있는 값 파일로 만들기

```bash
./scripts/secrets/printout.sh -r ap-northeast-2 -a jeonong-api -e alpha -o ./
```

- update
  SSM 에 있는 값 파일로 만든거를 기반으로 내용 업데이트 하기

```bash
./scripts/secrets/update.sh -r ap-northeast-2 -a jeonong-api -e alpha -i ./
```

# phase1

- 중성동(중랑구, 성동구, 동대문구)의 세 구의 마트정보를 모아서 보여주는 웹 어플리케이션 서비스

# 초기멤버

- 조용진, 고영범
