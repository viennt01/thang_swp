import { Avatar, Card, Col, Row, Spin, Tabs, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Feed from './feed';
import { useEffect, useState } from 'react';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import FeeForSale from './feed-for-sale';
import style from './index.module.scss';
import Sold from './sold';
import Sale from './sale';
import CanBuy from './can-buy';

const { Text } = Typography;
export default function Profile() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAddress, setUserAddress] = useState('');
  useEffect(() => {
    setUserName(appLocalStorage.get(LOCAL_STORAGE_KEYS.NAME_USER));
    setUserEmail(appLocalStorage.get(LOCAL_STORAGE_KEYS.EMAIL_USER));
    setUserAddress(appLocalStorage.get(LOCAL_STORAGE_KEYS.ADDRESS_USER));
  }, []);
  return (
    <>
      <Row style={{ marginTop: 8 }} className={style.profile}>
        <Col span={24} style={{ marginBottom: '8px' }}>
          <Card
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {false ? (
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Spin />
              </div>
            ) : (
              <>
                <Row>
                  {/* <Col
                    span={24}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Title level={3}>Thông tin cá nhân</Title>
                  </Col> */}
                  <Col
                    span={24}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <Avatar size={120} icon={<UserOutlined />} />
                  </Col>
                  <Col
                    span={24}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <Text strong>{userName}</Text>
                  </Col>{' '}
                  <Col
                    span={24}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <Text strong>{userEmail}</Text>
                  </Col>{' '}
                  <Col
                    span={24}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <Text strong>{userAddress}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Tabs
                      type="card"
                      style={{ marginTop: 10 }}
                      items={[
                        {
                          label: 'Feed',
                          key: 'Feed',
                          children: <Feed />,
                        },
                        {
                          label: 'Feed for sale',
                          key: 'Feed for sale',
                          children: <FeeForSale />,
                        },
                        {
                          label: 'Sold',
                          key: 'Sold',
                          children: <Sold />,
                        },
                        {
                          label: 'Buy',
                          key: 'Buy',
                          children: <Sale />,
                        },
                        {
                          label: 'Can Buy',
                          key: 'Can Buy',
                          children: <CanBuy />,
                        },
                      ]}
                    />
                  </Col>
                </Row>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
}
