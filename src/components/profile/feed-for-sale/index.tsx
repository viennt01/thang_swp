import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Space,
  Spin,
  Typography,
} from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { API_NEW_FEEDS } from '@/fetcherAxios/endpoint';
import { GetNewFeedForSale, GetNewFeedForSaleById } from './fetcher';
import { formatDate } from '@/utils/format';
import { UserOutlined } from '@ant-design/icons';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/firebase/firebase';
import {
  GlobalOutlined,
  InboxOutlined,
  PhoneOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import Dragger from 'antd/lib/upload/Dragger';
import { InternalFieldProps } from 'rc-field-form/lib/Field';
import { CreateNewFeedForSale } from '@/layout/fetcher';

const { TextArea } = Input;
const { Title, Text } = Typography;

export interface image {
  imageID: string;
  urlImage: string;
}
const initalImage = {
  imageID: '',
  urlImage: '',
};

export default function FeeForSale() {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [isModalOpenFeed, setIsModalOpenFeed] = useState(false);
  // State to store uploaded file
  const [linkFile, setLinkFile] = useState<image>(initalImage);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [userName, setUserName] = useState('');
  const [idModelFeed, setIdModelFeed] = useState('');

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

  const getNewFeedByIdMulFee = useQuery({
    queryKey: [API_NEW_FEEDS.GET_NEWS_FEED_FOR_SALE_BY_ID],
    queryFn: () => {
      if (idModelFeed !== '') {
        return GetNewFeedForSaleById(idModelFeed);
      }
      return null;
    },
    enabled: idModelFeed !== '',
    onSuccess: (data) => {
      form.setFieldValue('Title', data.title);
      form.setFieldValue('Price', data.price);
      form.setFieldValue('Address', data.address);
      form.setFieldValue('Content', data.content);
      form.setFieldValue('phoneNumber', data.phoneNumber);
      setLinkFile(data.listImages[0]);
    },
  });

  const showModal = (id: string) => {
    setIdModelFeed(id);
    form.resetFields();
    setLinkFile(initalImage);
    getNewFeedByIdMulFee.isFetching;
    setIsModalOpenFeed(true);
  };

  const handleOk = () => {
    setIdModelFeed('');
    setLinkFile(initalImage);
    form.resetFields();
    setIsModalOpenFeed(false);
  };

  const handleCancel = () => {
    setIdModelFeed('');
    setLinkFile(initalImage);
    form.resetFields();
    setIsModalOpenFeed(false);
  };
  useEffect(() => {
    if (isModalOpenFeed) form.resetFields();
  }, [isModalOpenFeed, form]);

  const normFile: InternalFieldProps['getValueFromEvent'] = (e) => {
    return e.fileList[0] ? [e.fileList[0].originFileObj] : [];
  };

  const createNewFeedA = useMutation({
    mutationFn: (value: any) => CreateNewFeedForSale(value),
    onSuccess: () => {
      successToast('New feed created successfully');
      setIsLoadingSubmit(false);
    },
    onError: () => {
      errorToast(API_MESSAGE.ERROR);
      setIsLoadingSubmit(false);
    },
  });
  const submitData = (formValues: any) => {
    setIsLoadingSubmit(true);
    const data = {
      newsFeedID: idModelFeed,
      title: formValues.Title,
      content: formValues.Content,
      price: formValues.Price,
      address: formValues.Address,
      phoneNumber: formValues.phoneNumber,
      imageUpdateRequests: [
        {
          imageID: linkFile.imageID,
          urlImage: linkFile.urlImage,
        },
      ],
    };
    createNewFeedA.mutate(data);
  };

  // Handle file upload event and update state
  function handleChange() {
    setIsLoadingImage(true);
    handleUpload();
  }

  const handleUpload = () => {
    const storageRef = ref(
      storage,
      `/files/${form.getFieldValue('file')[0].name}`
    );
    const uploadTask = uploadBytesResumable(
      storageRef,
      form.getFieldValue('file')[0]
    );

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setLinkFile((state) => ({
            ...state,
            urlImage: url,
          }));
          setIsLoadingImage(false);
        });
      }
    );
  };
  useEffect(() => {
    setUserName(appLocalStorage.get(LOCAL_STORAGE_KEYS.NAME_USER));
  }, []);

  return (
    <div style={{ margin: '15px 0' }}>
      {data
        .filter((filStatus: any) => filStatus.status === 1)
        .map((item: any) => {
          return (
            <Row
              key={item?.newsFeedID}
              style={{ cursor: 'pointer' }}
              onClick={() => showModal(item.newsFeedID)}
            >
              <Col span={24} style={{ marginBottom: '26px' }}>
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
      <Modal
        title={
          <Row justify={'center'}>
            <Col>
              <Title level={3} style={{ margin: '-10px 0' }}>
                EDIT FEED FOR SALE
              </Title>
            </Col>
            <hr style={{ width: '90%', marginTop: '16px' }} />
          </Row>
        }
        open={isModalOpenFeed}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Space direction="horizontal" style={{ marginBottom: '16px' }}>
          <div>
            <Avatar
              style={{
                verticalAlign: 'middle',
                marginRight: '10px',
              }}
              size={50}
              icon={<UserOutlined />}
            />
          </div>
          <Space size={1} direction="vertical">
            <Title level={4}>
              <Title level={4}>{userName}</Title>
            </Title>
            <Text type="secondary">
              <GlobalOutlined /> Public
            </Text>
          </Space>
        </Space>

        <Form form={form} layout="vertical" onFinish={submitData}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="Title"
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: 'Please input your a title',
                  },
                ]}
              >
                <Input placeholder="Please input your a title" size="large" />
              </Form.Item>
            </Col>
            <Col lg={12} span={24}>
              <Form.Item
                name="Price"
                rules={[
                  {
                    required: true,
                    message: 'Please input your price',
                  },
                ]}
                style={{ margin: 0 }}
              >
                <Input
                  type="number"
                  min={0}
                  prefix="₫"
                  suffix="VND"
                  size="large"
                  placeholder="Please input your price"
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="Address"
                rules={[
                  {
                    required: true,
                    message: 'Please input your address!',
                  },
                ]}
                style={{ margin: 0 }}
              >
                <Input
                  size="large"
                  prefix={<HomeOutlined />}
                  placeholder="Address"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone number!',
                  },
                ]}
                style={{ margin: 0 }}
              >
                <Input
                  size="large"
                  prefix={<PhoneOutlined />}
                  placeholder="Phone Number"
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="Content"
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: 'Please input your content',
                  },
                ]}
              >
                <TextArea
                  size="large"
                  rows={3}
                  placeholder="Please input your content!!!"
                />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item
                name="file"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                style={{ margin: 0 }}
              >
                <Dragger
                  multiple={true}
                  accept="/image/*"
                  onChange={handleChange}
                  disabled={isLoadingImage}
                >
                  <Row>
                    <Col span={linkFile.urlImage.length !== 0 ? 0 : 24}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited
                        from uploading company data or other banned files.
                      </p>
                    </Col>
                  </Row>
                  <Col span={linkFile.urlImage.length !== 0 ? 24 : 0}>
                    <Image alt="anh" src={linkFile.urlImage} />
                  </Col>
                  <Spin
                    style={{ display: isLoadingImage ? '' : 'none' }}
                    size="large"
                  />
                </Dragger>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                loading={isLoadingSubmit}
              >
                EDIT
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
