import { FC, useState, ReactNode } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Session } from 'models/Session'

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, InboxOutlined } from '@ant-design/icons'

import sg from 'utils/styleguide'

import 'antd/dist/antd.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

type Props = {
  session: Session;
  children?: ReactNode;
  title: string;
}

const DefaultLayout: FC<Props> = ({ title, children, session }) => {
  const router = useRouter()
  const [isCollapsed, onCollapsed] = useState(false)
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Sider
        collapsible
        collapsed={isCollapsed}
        onCollapse={() => onCollapsed(!isCollapsed)}
      >
        <SiderHeader>
          {`${session.user.name}(${session.user.role})`}
        </SiderHeader>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <SubMenu
            key="1"
            title={<span><InboxOutlined /><span>[WIP]Products</span></span>}
          >
            <Menu.Item key="2">[WIP]상품관리</Menu.Item>
            <Menu.Item key="3">[WIP]카테고리관리</Menu.Item>
            <Menu.Item key="4">[WIP]제조사관리</Menu.Item>
          </SubMenu>
          <Menu.Item key="5">
            <UserOutlined /><span>[TODO]사용자관리</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 1rem',

            height: sg.default.headerHeightSize,
            lineHeight: sg.default.headerHeightSize,

            fontWeight: sg.default.textWeightStrong,
            fontSize: sg.default.textSizeTitle,

            backgroundColor: sg.default.pointColor,
            color: sg.default.textColorR,
          }}
        >
          {title}
        </Header>
        <Content style={{ margin: '0 1rem' }}>
          <Breadcrumb style={{ margin: '1rem 0' }}>
            {GenerateBreadCrumb("/products/helloworld")}
            {/* {GenerateBreadCrumb(router.pathname)} */}
          </Breadcrumb>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

const GenerateBreadCrumb = (pathname: string): ReactNode[] => {
  const previous:string[] = []
  const items = pathname.split("/").map((v, i) => {
    previous.push(v)
    return (
      <Breadcrumb.Item
        href={[...previous].join('/')}
        key={`crumb-${i+1}`}
      >
        {v}
      </Breadcrumb.Item>
    )
  })
  return items
}

const SiderHeader = styled.div`
  padding: 0 1rem;
  height: ${sg.default.headerHeightSize};

  line-height: ${sg.default.headerHeightSize};
  font-size: ${sg.default.textSizeStrong};

  background-color: ${sg.default.pointStrongColor};
  color: ${sg.default.textColorR};
`


export default DefaultLayout