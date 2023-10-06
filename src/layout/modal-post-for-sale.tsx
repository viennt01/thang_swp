import {
  Avatar,
  Space,
  Form,
  Input,
  Typography,
  Image,
  Row,
  Col,
  Modal,
  Button,
  Select,
  Spin,
  DatePicker,
} from 'antd';
import React, { useEffect, useState } from 'react';
import {
  GlobalOutlined,
  InboxOutlined,
  FormOutlined,
  PhoneOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import { useRouter } from 'next/router';
import { ROUTERS } from '@/constant/router';
import { InternalFieldProps } from 'rc-field-form/lib/Field';
import { useMutation, useQuery } from '@tanstack/react-query';
import { API_MASTER_DATA } from '@/fetcherAxios/endpoint';
import { CreateNewFeedForSale, getTypeGoods } from './fetcher';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { storage } from '../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
const { TextArea } = Input;
const { Title, Text } = Typography;
const dateFormat = 'YYYY/MM/DD';

export default function ModalPostForSale() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to store uploaded file
  const [linkFile, setLinkFile] = useState<any>('');
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [userName, setUserName] = useState('');
  const showModal = () => {
    form.resetFields();
    setLinkFile('');
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setLinkFile('');
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setLinkFile('');
    form.resetFields();
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (isModalOpen) form.resetFields();
  }, [isModalOpen, form]);

  const normFile: InternalFieldProps['getValueFromEvent'] = (e) => {
    return e.fileList[0] ? [e.fileList[0].originFileObj] : [];
  };

  const getTypeGoodsMul = useQuery({
    queryKey: [API_MASTER_DATA.GET_TYPE_GOODS],
    queryFn: () => getTypeGoods(),
  });

  const createNewFeedA = useMutation({
    mutationFn: (value: any) => CreateNewFeedForSale(value),
    onSuccess: () => {
      successToast('New feed created successfully');
      setIsModalOpen(false);
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
      userID: appLocalStorage.get(LOCAL_STORAGE_KEYS.ID_USER),
      typeGoodsID: formValues.TypeGoodsID,
      title: formValues.Title,
      content: formValues.Content,
      listImage: [linkFile],
      address: formValues.Address,
      price: formValues.Price,
      phoneNumber: formValues.PhoneNumber,
      birthDate: formValues.BirthDated.valueOf(),
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
          setLinkFile(url);
          setIsLoadingImage(false);
        });
      }
    );
  };
  useEffect(() => {
    setUserName(appLocalStorage.get(LOCAL_STORAGE_KEYS.NAME_USER));
  }, []);

  return (
    <>
      <Button
        type="primary"
        shape="round"
        icon={<FormOutlined />}
        onClick={() => showModal()}
        style={{ display: router.asPath === ROUTERS.HOME ? '' : 'none' }}
      >
        POST FOR SALE
      </Button>
      <Modal
        title={
          <Row justify={'center'}>
            <Col>
              <Title level={3} style={{ margin: '-10px 0' }}>
                CREATE NEW FEED FOR SALE
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
        <Space direction="horizontal" style={{ marginBottom: '16px' }}>
          <div>
            <Avatar
              style={{
                verticalAlign: 'middle',
                marginRight: '10px',
              }}
              size={50}
            >
              T
            </Avatar>
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
            <Col span={24}>
              <Form.Item
                name="TypeGoodsID"
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: 'Please select type goods',
                  },
                ]}
              >
                <Select
                  placeholder="Please select type goods"
                  size="large"
                  options={
                    getTypeGoodsMul.data?.map((type: any) => ({
                      label: type.typeGoodsName,
                      value: type.typeGoodsID,
                    })) || []
                  }
                />
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
                name="BirthDated"
                rules={[
                  {
                    required: true,
                    message: 'Please input your birth dated!',
                  },
                ]}
                style={{ margin: 0 }}
              >
                <DatePicker
                  placeholder="Please input your birth date"
                  size="large"
                  showToday
                  format={dateFormat}
                  style={{ width: '100%' }}
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

            <Col span={linkFile.length !== 0 ? 0 : 24}>
              <Form.Item
                name="file"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: 'Please upload image',
                  },
                ]}
              >
                <Dragger
                  multiple={true}
                  accept="/image/*"
                  onChange={handleChange}
                  disabled={isLoadingImage}
                >
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
                  <Spin
                    style={{ display: isLoadingImage ? '' : 'none' }}
                    size="large"
                  />
                </Dragger>
              </Form.Item>
            </Col>
            <Col span={linkFile.length !== 0 ? 24 : 0}>
              <Image alt="anh" src={linkFile} />
            </Col>
            <Col span={24}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                loading={isLoadingSubmit}
              >
                POST
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}