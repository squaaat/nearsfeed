import { FC } from 'react'
import DefaultLayout from 'components/DefaultLayout'
import { PageHeader, Descriptions, Row, Col, Card, Layout, Form, Select } from 'antd';
import { Session, MockSession } from 'store/models/Session'
import CategoryManager from 'components/CategoryManager'
import ManufactureManager from 'components/ManufactureManager';

type PageProps = {
  session: Session;
}

type ServerProps = {
  props: PageProps;
}


const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};


const IndexPage:FC<PageProps> = ({ session }) => {
  return (
    <DefaultLayout
      session={session}
      title="상품등록"
    >
      <PageHeader
        ghost={false}
        title="상품등록"
        subTitle="제조사, 카테고리 등록 같이 등록 가능"
      >
        <Descriptions size="small" column={1}>
          <Descriptions.Item label="제조사 등록">이름만 넣으면 된다</Descriptions.Item>
          <Descriptions.Item label="카테고리 등록">{`catA/catB/catC  ... 이렇게 하면 depth1, depth2, depth3 등록가능`}</Descriptions.Item>
          <Descriptions.Item label="주의사항">
            <ul>
              <li>제조사가 없으면, 등록한 후에 다시 찾아서 넣어주어야 한다.</li>
              <li>카테고리가 없으면, 등록한 후에 다시 찾아서 넣어주어야 한다.</li>
            </ul>
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Layout.Content
        style={{ margin: '1rem' }}
      >
        <Row
          gutter={[16,16]}
          style={{ marginBottom: '0.5rem'}}
        >
          <Col span={12}>
            <CategoryManager
            />
          </Col>
          <Col span={12}>
            <ManufactureManager
            />
          </Col>
        </Row>
        <Row
          gutter={[16,16]}
        >
          <Col span={24}>
            <Card title="상품등록">
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
              >
                <Form.Item
                  label="category"
                  name="category"
                  rules={[{ required: true, message: 'Please input your category!' }]}
                >
                  <Select
                    showSearch
                    placeholder="type a category"
                    optionFilterProp="children"
                    onChange={(...rest) => console.log('onChange', ...rest)}
                    onFocus={(...rest) => console.log('onFocus', ...rest)}
                    onBlur={(...rest) => console.log('onBlur', ...rest)}
                    onSearch={(...rest) => console.log('onSearch', ...rest)}
                  >
                    <Select.Option key={0} value="jack">뚜레주루</Select.Option>
                    <Select.Option key={1} value="lucy">뚜벅이</Select.Option>
                    <Select.Option key={2} value="tom">또라이</Select.Option>
                  </Select>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </DefaultLayout>
  )
}

// This function gets called at build time
export async function getStaticProps() {
  const data: ServerProps = {
    props: {
      session: MockSession,
    }
  }
  return data
}

export default IndexPage
