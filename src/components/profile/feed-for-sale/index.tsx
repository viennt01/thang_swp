import React, { useState, useEffect } from 'react';
import { Avatar, Col, Image, Row, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { API_NEW_FEEDS } from '@/fetcherAxios/endpoint';
import { GetNewFeedForSale } from './fetcher';
import { formatDate } from '@/utils/format';
import router from 'next/router';
import { ROUTERS } from '@/constant/router';
import { UserOutlined } from '@ant-design/icons';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';

const { Title, Text } = Typography;

export default function FeeForSale() {
  const [data, setData] = useState([]);

  const getNewFeedMul = useQuery({
    queryKey: [API_NEW_FEEDS.GET_NEWS_FEED_SALE_BY_ID_USER],
    queryFn: () =>
      GetNewFeedForSale(appLocalStorage.get(LOCAL_STORAGE_KEYS.ID_USER)),
    onSuccess: (data) => {
      setData(data.data);
    },
  });

  useEffect(() => {
    getNewFeedMul.isFetching;
  }, [getNewFeedMul.isFetching]);

  const handleChangePageDetail = (value: any) => {
    router.push(ROUTERS.FEE_FOR_SALE_DETAIL(value));
  };

  return (
    <div style={{ margin: '15px 0' }}>
      {data
        .filter((filStatus: any) => filStatus.status === 1)
        .map((item: any) => {
          return (
            <Row
              key={item?.newsFeedID}
              style={{ cursor: 'pointer' }}
              onClick={() => handleChangePageDetail(item?.newsFeedID)}
            >
              <Col span={24}>
                <Row gutter={24}>
                  <Col span={8}>
                    <Image
                      style={{ height: '200px' }}
                      src={item?.listImages[0]?.urlImage}
                      alt="anh"
                    />
                  </Col>
                  <Col span={16}>
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
                            <Title level={3} style={{ marginBottom: '0px' }}>
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
          );
        })}
    </div>
  );
}
