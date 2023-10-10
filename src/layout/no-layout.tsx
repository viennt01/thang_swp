import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout, Space, Typography, Button, FloatButton, Image } from 'antd';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';

import { ROUTERS } from '@/constant/router';

const { Text } = Typography;
const { Header, Content, Footer } = Layout;
export const HEADER_HEIGHT = 64;
export const FOOTER_HEIGHT = 38;

interface Props {
  children: React.ReactNode;
}
export function PageWithNoLayout(props: Props) {
  const router = useRouter();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Head>
        <link rel="favicon" href="/images/logo.png" />
        <link rel="shortcut icon" href="/images/logo.png" />
      </Head>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 999,
          padding: '0 24px',
          background: '#fff',
          height: HEADER_HEIGHT,
          borderBottom: '1px solid',
        }}
      >
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Image
              preview={false}
              style={{
                cursor: 'pointer',
                height: '54px',
                marginTop: '-4px',
              }}
              src="/images/logo.png"
              onClick={() => router.push(ROUTERS.HOME)}
              alt="logo"
            />
          </Space>
          <Space style={{ cursor: 'pointer' }}>
            <div>
              <Button onClick={() => router.push(ROUTERS.LOGIN)}>
                SIGN IN
              </Button>
              <Button
                onClick={() => router.push(ROUTERS.REGISTER)}
                style={{ marginLeft: '8px' }}
                type="primary"
              >
                SIGN UP
              </Button>
            </div>
          </Space>
        </Space>
      </Header>
      <Layout>
        <Content
          style={{
            padding: '0 24px',
            maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
            overflowY: 'auto',
          }}
        >
          <main>{props.children}</main>
          <FloatButton.Group
            trigger="hover"
            type="primary"
            style={{ right: 24 }}
            icon={<CustomerServiceOutlined />}
          >
            <FloatButton />
            <FloatButton icon={<CommentOutlined />} />
          </FloatButton.Group>
          <Footer
            style={{
              textAlign: 'center',
              padding: '8px 0',
              height: `${FOOTER_HEIGHT}px`,
            }}
          >
            <Text disabled>
              ©2023 Existing SWP_ website. All Rights Reserved | Design by Quoc
              Thang
            </Text>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
}
