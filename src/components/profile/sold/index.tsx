import React, { useState, useEffect } from 'react';
import { Avatar, Col, Image, Row, Spin, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { API_NEW_FEEDS } from '@/fetcherAxios/endpoint';
import { GetSold } from './fetcher';
import { formatDate } from '@/utils/format';
import { UserOutlined } from '@ant-design/icons';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';

const { Title, Text } = Typography;

export interface image {
  imageID: string;
  urlImage: string;
}

export default function Sold() {
  const [data, setData] = useState([]);

  const getNewFeedMul = useQuery({
    queryKey: [API_NEW_FEEDS.GET_SOLD],
    queryFn: () => GetSold(appLocalStorage.get(LOCAL_STORAGE_KEYS.ID_USER)),
    onSuccess: (data) => {
      setData(data.data);
    },
  });

  useEffect(() => {
    getNewFeedMul.isFetching;
  }, [getNewFeedMul.isFetching]);

  return (
    <div style={{ margin: '15px 0' }}>
      {getNewFeedMul.isLoading ? (
        <Row justify={'center'}>
          <Col>
            <Spin size="large" />
          </Col>
        </Row>
      ) : (
        data.map((item: any) => {
          return (
            <>
              <Row
                key={item?.newsFeedID}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                <Col
                  className="item"
                  span={24}
                  style={{ marginBottom: '26px' }}
                >
                  <Row gutter={24}>
                    <Col span={8}>
                      <Image
                        style={{ height: '200px' }}
                        src={item?.listImages[0]?.urlImage}
                        alt="anh"
                      />
                    </Col>
                    <Col span={13}>
                      <Row>
                        <Col
                          span={24}
                          style={{
                            height: '100px',
                            display: 'flex',
                            alignItems: 'flex-start',
                          }}
                        >
                          <Row>
                            <Col span={24}>
                              <Title
                                level={3}
                                style={{
                                  marginBottom: '0px',
                                  cursor: 'pointer',
                                }}
                              >
                                {item.title}
                              </Title>
                            </Col>
                            <Col span={24}>
                              <Title
                                level={5}
                                type="danger"
                                style={{ marginTop: '0px' }}
                              >
                                {`${item.price}`.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ','
                                ) + ' VND'}
                              </Title>
                            </Col>
                          </Row>
                        </Col>
                        <Col
                          span={24}
                          style={{
                            height: '100px',
                            display: 'flex',
                            alignItems: 'flex-end',
                          }}
                        >
                          <Avatar
                            style={{
                              verticalAlign: 'middle',
                              marginRight: '8px',
                            }}
                            size={25}
                            icon={<UserOutlined />}
                          />

                          <Text type="secondary">{item.userName}</Text>
                          <Text type="secondary">
                            - {formatDate(Number(item.insertDated))}
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          );
        })
      )}
    </div>
  );
}
