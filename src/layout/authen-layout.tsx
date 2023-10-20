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
  Image,
  Menu,
  Input,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  ShopOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
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
const { Search } = Input;

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
        <Space
          className={AuthenLayout.container}
          style={{
            width: '100%',
            justifyContent: 'space-between',
            marginTop: '-18px',
          }}
        >
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

          <Space
            style={{
              cursor: 'pointer',
            }}
          >
            <Space
              style={{
                display: router.asPath === ROUTERS.HOME ? '' : 'none',
              }}
            >
              <Space.Compact>
                <Search
                  placeholder="Input search text"
                  allowClear
                  size="middle"
                  onChange={(e) => {
                    appLocalStorage.set(
                      LOCAL_STORAGE_KEYS.SEARCH_FEED,
                      e.target.value as string
                    );
                    window.dispatchEvent(
                      new Event(LOCAL_STORAGE_KEYS.SEARCH_FEED)
                    );
                  }}
                />
              </Space.Compact>
            </Space>
            <Space
              style={{
                display: router.asPath === ROUTERS.FEE_FOR_SALE ? '' : 'none',
              }}
            >
              <Space.Compact>
                <Search
                  placeholder="Input search text"
                  allowClear
                  size="middle"
                  onChange={(e) => {
                    appLocalStorage.set(
                      LOCAL_STORAGE_KEYS.SEARCH_FEED_FOR_SALE,
                      e.target.value as string
                    );
                    window.dispatchEvent(
                      new Event(LOCAL_STORAGE_KEYS.SEARCH_FEED_FOR_SALE)
                    );
                  }}
                />
              </Space.Compact>
            </Space>
            <Space>
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
                    icon={<UserOutlined />}
                  />

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
                        onClick={() => {
                          return (
                            router.push(ROUTERS.PROFILE),
                            setClassActiveAvatarPopup('')
                          );
                        }}
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
                icon: <ShopOutlined />,
                label: 'Home',
              },
              {
                key: ROUTERS.FEE_FOR_SALE,
                icon: <ShoppingCartOutlined />,
                label: 'New feed for sale',
              },
              {
                key: ROUTERS.PROFILE,
                icon: <UserOutlined />,
                label: 'Profile',
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
          <main
            style={{
              minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px - 8px`,
            }}
          >
            {props.children}
          </main>
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
