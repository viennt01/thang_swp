import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AuthenLayout from './authen-layout.module.scss';
import {
  Avatar,
  Layout,
  Space,
  Typography,
  Button,
  FloatButton,
  Image,
  Menu,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  CommentOutlined,
  CustomerServiceOutlined,
  HomeOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { ROUTERS } from '@/constant/router';
import ModalPost from './modal-post';
import ModalPostForSale from './modal-post-for-sale';

const { Header, Content, Footer, Sider } = Layout;
export const HEADER_HEIGHT = 64;
export const FOOTER_HEIGHT = 38;
const { Text } = Typography;

interface Props {
  children: React.ReactNode;
}
export function AppLayout(props: Props) {
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const [classActiveAvatarPopup, setClassActiveAvatarPopup] = useState('');
  const [selectedKey, setSelectedKey] = useState(ROUTERS.HOME);
  function onClickShowPopupAvatar() {
    classActiveAvatarPopup === 'active'
      ? setClassActiveAvatarPopup('')
      : setClassActiveAvatarPopup('active');
  }

  const handleLogout = () => {
    appLocalStorage.remove(LOCAL_STORAGE_KEYS.ID_USER);
    router.push(ROUTERS.LOGIN);
  };

  const handleClickMenuItem = (path: MenuInfo) => {
    setSelectedKey(path.key);
    router.push(path.key);
  };
  useEffect(() => {
    setUserName(appLocalStorage.get(LOCAL_STORAGE_KEYS.NAME_USER));
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Head>
        <link rel="favicon" href="/images/logo-fpt.png" />
        <link rel="shortcut icon" href="/images/logo-fpt.png" />
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
                marginTop: '-15px',
              }}
              src="/images/logo-fpt.png"
              onClick={() => router.push(ROUTERS.HOME)}
              alt="logo"
            />
          </Space>
          <Space style={{ cursor: 'pointer' }}>
            <ModalPostForSale />
            <ModalPost />
            <div>
              <div
                onClick={onClickShowPopupAvatar}
                className={AuthenLayout.userAvatar}
              >
                <Avatar
                  style={{
                    verticalAlign: 'middle',
                    marginRight: '10px',
                  }}
                >
                  T
                </Avatar>
                {userName}
              </div>
              <div
                className={`${AuthenLayout.userMenu} ${
                  classActiveAvatarPopup != '' ? AuthenLayout.active : ''
                }`}
              >
                <ul>
                  <li>
                    <Button
                      className={AuthenLayout.userMenuButton}
                      icon={<UserOutlined />}
                    >
                      My Profile
                    </Button>
                  </li>
                  <li>
                    <Button
                      className={AuthenLayout.userMenuButton}
                      icon={<LockOutlined />}
                    >
                      Change Password
                    </Button>
                  </li>
                  <li>
                    <Button
                      className={AuthenLayout.userMenuButton}
                      icon={<LogoutOutlined />}
                      danger
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </Space>
        </Space>
      </Header>
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="70">
          <div className="demo-logo-vertical" />
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={handleClickMenuItem}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              {
                key: ROUTERS.HOME,
                icon: <HomeOutlined />,
                label: 'Home',
              },
              {
                key: ROUTERS.PROFILE,
                icon: <UserOutlined />,
                label: 'My profile',
              },
            ]}
          />
        </Sider>
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
