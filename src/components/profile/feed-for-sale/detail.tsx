import {
  Avatar,
  Space,
  Form,
  Input,
  Typography,
  Image,
  Spin,
  Row,
  Col,
  Button,
  Card,
  Badge,
} from 'antd';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Comment } from 'semantic-ui-react';
import { FireOutlined, LikeOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CommentNewFeed, GetNewFeedForSaleById, LikeNewFeed } from './fetcher';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { API_NEW_FEEDS } from '@/fetcherAxios/endpoint';
import { formatDate } from '@/utils/format';
import style from './index.module.scss';
import router from 'next/router';
import { UserOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Text } = Typography;

export default function DetailForSale() {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [data, setData] = useState<any>();
  const { id } = router.query;
  const handleTextAreaPressEnter = (e: { key: string }) => {
    if (e.key === 'Enter') {
      const dataRequest = {
        userID: appLocalStorage.get(LOCAL_STORAGE_KEYS.ID_USER),
        content: form.getFieldValue('comment'),
        newsFeedID: data?.newsFeedID,
      };
      commentMutation.mutate(dataRequest);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue('comment', e.target.value);
  };

  const likeMutation = useMutation({
    mutationFn: (body: any) => {
      return LikeNewFeed(body);
    },
    onSuccess: (body: any) => {
      console.log(body);
      queryClient.invalidateQueries({
        queryKey: [API_NEW_FEEDS.CREATE_NEWS_FEED_FOR_SALE],
      });
    },
  });

  const commentMutation = useMutation({
    mutationFn: (body: any) => {
      return CommentNewFeed(body);
    },
    onSuccess: (body: any) => {
      console.log(body);
      queryClient.invalidateQueries({
        queryKey: [API_NEW_FEEDS.CREATE_NEWS_FEED_FOR_SALE],
      });
      form.resetFields();
    },
  });

  const getNewFeedForSaleByIdMul = useQuery({
    queryKey: [API_NEW_FEEDS.CREATE_NEWS_FEED_FOR_SALE],
    queryFn: () => {
      if (id) {
        return GetNewFeedForSaleById(id);
      }
      return null;
    },
    onSuccess: (data) => {
      setData(data);
    },
  });

  useEffect(() => {
    form.resetFields();
  }, []);

  return (
    <>
      <>
        {getNewFeedForSaleByIdMul.isLoading ? (
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
          <Row gutter={32} style={{ marginTop: '24px' }}>
            <Col span={24} lg={16} style={{ marginBottom: '24px' }}>
              <Row>
                <Col span={24} style={{ marginBottom: '24px' }}>
                  <Card style={{ height: '400px', backgroundColor: '#F5F5F5' }}>
                    <div className={style.contentContainer}>
                      <Image
                        src={data?.listImages[0].urlImage}
                        alt="anh"
                        height={350}
                        width={'auto'}
                      />
                    </div>
                  </Card>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={21} style={{ marginBottom: '24px' }}>
                      <Title level={5}>{data?.title}</Title>
                      <Text type="danger" strong>
                        {`${data?.price}`.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ','
                        ) + ' VND'}
                      </Text>
                    </Col>
                    <Col span={1} style={{ display: 'flex', right: '0px' }}>
                      <Button
                        danger
                        style={{
                          borderRadius: '16px',
                        }}
                        onClick={() => {
                          const dataRequest = {
                            userID: appLocalStorage.get(
                              LOCAL_STORAGE_KEYS.ID_USER
                            ),
                            newsFeedID: data?.newsFeedID,
                          };
                          likeMutation.mutate(dataRequest);
                        }}
                      >
                        {data?.likeQuantity} <LikeOutlined />
                      </Button>
                    </Col>
                    <Col span={18}>
                      <Text>{data?.content}</Text>
                    </Col>
                    <Col
                      span={18}
                      style={{
                        marginTop: '16px',
                      }}
                    >
                      <Text strong>Địa chỉ: </Text> <Text>{data?.address}</Text>
                    </Col>
                    <Col
                      span={18}
                      style={{
                        marginTop: '16px',
                      }}
                    >
                      <Text strong>Ngày sinh: </Text>{' '}
                      <Text>{formatDate(Number(data?.birthDated))}</Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} lg={8}>
              <Card>
                <Row>
                  <Col span={24} style={{ marginBottom: '32px' }}>
                    <Row>
                      <Col span={6}>
                        <Avatar size={64} icon={<UserOutlined />} />
                      </Col>

                      <Col span={18}>
                        <Title level={5}>{data?.userName}</Title>
                        <Badge
                          status="processing"
                          text="Hoạt động 10 phút trước"
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24} style={{ marginBottom: '32px' }}>
                    <Row>
                      <Col span={11}>
                        <Row>
                          <Col
                            span={24}
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              marginBottom: '8px',
                            }}
                          >
                            Bán chuyên
                          </Col>
                          <Col
                            span={24}
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <FireOutlined />
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        span={2}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '0px',
                            height: '100%',
                            border: '1px inset',
                            float: 'left',
                          }}
                        ></div>
                      </Col>
                      <Col span={11}>
                        <Row>
                          <Col
                            span={24}
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            Phản hồi chat
                          </Col>
                          <Col
                            span={24}
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <Text strong>Thỉnh thoảng</Text>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24} style={{ marginBottom: '32px' }}>
                    <Row>
                      <Col
                        span={24}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginBottom: '26px',
                        }}
                      >
                        <Button
                          type="primary"
                          //   loading={isLoading}
                          style={{
                            height: '40px',
                            width: '80%',
                            fontSize: '18px',
                            color: '#fff',
                            backgroundColor: '#FC0404',
                            boxShadow:
                              'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
                          }}
                          htmlType="submit"
                          onClick={() => {
                            // return handleBuyTicket(data?.id);
                          }}
                        >
                          Mua ngay
                        </Button>
                      </Col>
                      <Col
                        span={24}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginBottom: '26px',
                        }}
                      >
                        <Button
                          type="primary"
                          style={{
                            height: '40px',
                            width: '80%',
                            fontSize: '18px',
                            color: '#fff',
                            backgroundColor: '#2BE876',
                            boxShadow:
                              'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
                          }}
                          htmlType="submit"
                          href={`tel:${data?.phoneNumber}`}
                        >
                          <Text strong style={{ color: '#fff' }}>
                            BẤM ĐỂ GỌI
                          </Text>
                        </Button>
                      </Col>
                      <Col
                        span={24}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginBottom: '26px',
                        }}
                      >
                        <Button
                          type="primary"
                          style={{
                            height: '40px',
                            width: '80%',
                            fontSize: '18px',
                            color: '#2BE876',
                            backgroundColor: '#fff',
                            boxShadow:
                              'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
                          }}
                          htmlType="submit"
                          href={`https://zalo.me/${data?.phoneNumber}`}
                        >
                          <Text strong style={{ color: '#2BE876' }}>
                            CHAT VỚI NGƯỜI BÁN
                          </Text>
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        )}
        <Card>
          <Comment.Group>
            {data?.commentDTOs?.map((item: any) => {
              return (
                <Comment key={item?.commentID}>
                  {/* <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" /> */}
                  <Space size={10}>
                    <Space
                      style={{
                        display: 'flex',
                        top: '0px',
                        marginTop: '-10px',
                      }}
                    >
                      <Avatar size={35} icon={<UserOutlined />} />
                    </Space>
                    <Comment.Content>
                      <Comment.Author as="a">{item?.userName}</Comment.Author>
                      <Comment.Metadata>
                        <div>{formatDate(Number(item?.insertDated))}</div>
                      </Comment.Metadata>
                      <Comment.Text>{item?.content}</Comment.Text>
                    </Comment.Content>
                  </Space>
                </Comment>
              );
            })}
            <Form form={form}>
              <Form.Item name="comment">
                <TextArea
                  rows={2}
                  onPressEnter={handleTextAreaPressEnter}
                  onChange={(e: any) => {
                    handleInputChange(e);
                  }}
                />
              </Form.Item>
            </Form>
          </Comment.Group>
        </Card>
      </>
    </>
  );
}
