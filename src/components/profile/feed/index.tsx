import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  List,
  Modal,
  Row,
  Space,
  Spin,
  Typography,
  Image,
} from 'antd';
import { LikeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import ModalComment from './modal-comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_NEW_FEEDS } from '@/fetcherAxios/endpoint';
import { GetNewFeed, GetNewFeedById, UpdateNewFeed } from './fetcher';
import { formatDate } from '@/utils/format';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { InternalFieldProps } from 'rc-field-form/lib/Field';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import Dragger from 'antd/lib/upload/Dragger';
import { GlobalOutlined, InboxOutlined } from '@ant-design/icons';
import { storage } from '@/firebase/firebase';

const { Title, Text } = Typography;
const { TextArea } = Input;
export interface image {
  imageID: string;
  urlImage: string;
}
const initalImage = {
  imageID: '',
  urlImage: '',
};

const IconText = ({
  icon,
  text,
  onClick,
}: {
  icon: React.FC<{ style?: React.CSSProperties }>;
  text?: string;
  onClick?: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const spaceStyle = {
    cursor: isHovered ? 'pointer' : 'none',
  };

  return (
    <Space
      onClick={onClick}
      style={spaceStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {React.createElement(icon)}
      {text}
    </Space>
  );
};

export default function Feed() {
  const [data, setData] = useState([]);
  const [dataModal, setDataModal] = useState<any>();
  const [idModel, setIdModel] = useState('');

  const getNewFeedMul = useQuery({
    queryKey: [API_NEW_FEEDS.GET_NEWS_FEED_BY_ID_USER],
    queryFn: () => GetNewFeed(appLocalStorage.get(LOCAL_STORAGE_KEYS.ID_USER)),
    onSuccess: (data) => {
      setData(data.data);
    },
  });
  const getNewFeedByIdMul = useQuery({
    queryKey: [API_NEW_FEEDS.GET_NEWS_FEED_BY_ID],
    queryFn: () => {
      if (idModel !== '') {
        return GetNewFeedById(idModel);
      }
      return null;
    },
    enabled: idModel !== '',
    onSuccess: (data) => {
      setDataModal(data);
    },
  });

  useEffect(() => {
    getNewFeedMul.isFetching;
  }, [getNewFeedMul.isFetching]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (value: any) => {
    setIdModel(value);
    getNewFeedByIdMul.isFetching;
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIdModel('');
    getNewFeedMul.isFetching;
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIdModel('');
    getNewFeedMul.isFetching;
    setIsModalOpen(false);
  };

  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [isModalOpenFeed, setIsModalOpenFeed] = useState(false);
  // State to store uploaded file
  const [linkFile, setLinkFile] = useState<image>(initalImage);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [userName, setUserName] = useState('');
  const [idModelFeed, setIdModelFeed] = useState('');

  const normFile: InternalFieldProps['getValueFromEvent'] = (e) => {
    return e.fileList[0] ? [e.fileList[0].originFileObj] : [];
  };

  const createNewFeedA = useMutation({
    mutationFn: (value: any) => UpdateNewFeed(value),
    onSuccess: () => {
      successToast('New feed created successfully');
      setIsLoadingSubmit(false);
      queryClient.invalidateQueries({
        queryKey: [API_NEW_FEEDS.GET_NEWS_FEED_BY_ID],
      });
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

  const getNewFeedByIdMulFee = useQuery({
    queryKey: [API_NEW_FEEDS.GET_NEWS_FEED_BY_ID],
    queryFn: () => {
      if (idModelFeed !== '') {
        return GetNewFeedById(idModelFeed);
      }
      return null;
    },
    enabled: idModelFeed !== '',
    onSuccess: (data) => {
      form.setFieldValue('Title', data.title);
      form.setFieldValue('Content', data.content);
      setLinkFile(data.listImages[0]);
    },
  });

  const showModalFeed = (id: string) => {
    setIdModelFeed(id);
    form.resetFields();
    setLinkFile(initalImage);
    getNewFeedByIdMulFee.isFetching;
    setIsModalOpenFeed(true);
  };

  const handleOkFeed = () => {
    setIdModelFeed('');
    setIdModel('');
    setLinkFile(initalImage);
    form.resetFields();
    setIsModalOpenFeed(false);
  };

  const handleCancelFeed = () => {
    setIdModelFeed('');
    setIdModel('');
    setLinkFile(initalImage);
    form.resetFields();
    setIsModalOpenFeed(false);
  };
  useEffect(() => {
    if (isModalOpenFeed) form.resetFields();
  }, [isModalOpenFeed, form]);

  return (
    <div style={{ margin: '15px 0' }}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={false}
        dataSource={data.filter((filStatus: any) => filStatus.status === 1)}
        renderItem={(item: any) => (
          <List.Item
            key={item.title}
            onClick={() => showModalFeed(item.newsFeedID)}
            actions={[
              <IconText
                icon={LikeOutlined}
                text={item.likeQuantity}
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                key="list-vertical-message"
                onClick={() => {
                  showModal(item.newsFeedID);
                }}
              />,
            ]}
            extra={
              <img
                width={272}
                alt="images"
                src={item?.listImages[0].urlImage || ''}
              />
            }
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{
                    verticalAlign: 'middle',
                  }}
                  size={50}
                  icon={<UserOutlined />}
                />
              }
              title={item?.title}
              description={formatDate(Number(item?.insertDated))}
            />
            {item.content}
          </List.Item>
        )}
      />

      <Modal
        title={
          <Row justify={'center'}>
            <Col>
              <Title level={3} style={{ margin: '-10px 0' }}>
                EDIT FEED
              </Title>
            </Col>
            <hr style={{ width: '90%', marginTop: '16px' }} />
          </Row>
        }
        open={isModalOpenFeed}
        onOk={handleOkFeed}
        onCancel={handleCancelFeed}
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
            <Title level={4}>{userName}</Title>
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
                    message: 'Please enter a title',
                  },
                ]}
              >
                <Input placeholder="Please enter a title" size="large" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="Content"
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter content',
                  },
                ]}
              >
                <TextArea
                  size="large"
                  rows={3}
                  placeholder="Please enter content!!!"
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
                    <Image alt="anh" src={linkFile.urlImage} preview={false} />
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

      <Modal
        title={
          <Row justify={'center'}>
            <Col>
              <Title level={3} style={{ margin: '-10px 0' }}>
                POST: {dataModal?.title || ''}
              </Title>
            </Col>
            <hr style={{ width: '90%', marginTop: '16px' }} />
          </Row>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <ModalComment
          modalData={dataModal}
          loadingData={getNewFeedByIdMul.isLoading}
        />
      </Modal>
    </div>
  );
}
