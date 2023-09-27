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
} from 'antd';
import React, { useEffect, useState } from 'react';
import { GlobalOutlined, InboxOutlined, FormOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import { useRouter } from 'next/router';
import { ROUTERS } from '@/constant/router';
import { InternalFieldProps } from 'rc-field-form/lib/Field';

const { TextArea } = Input;
const { Title, Text } = Typography;

export default function ModalPost() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (isModalOpen) form.resetFields();
  }, [isModalOpen, form]);

  const normFile: InternalFieldProps['getValueFromEvent'] = (e) => {
    return e.fileList[0] ? [e.fileList[0].originFileObj] : [];
  };

  return (
    <>
      <Button
        type="primary"
        shape="round"
        icon={<FormOutlined />}
        onClick={() => showModal()}
        style={{ display: router.asPath === ROUTERS.HOME ? '' : 'none' }}
      >
        ĐĂNG
      </Button>
      <Modal
        title={
          <Row justify={'center'}>
            <Col>
              <Title level={3} style={{ margin: '-10px 0' }}>
                Tạo bài viết
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
            <Title level={4}>Quốc Thắng</Title>
            <Text type="secondary">
              <GlobalOutlined /> Công khai
            </Text>
          </Space>
        </Space>
        <Form form={form} layout="vertical" onFinish={handleOk}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="note" style={{ margin: 0 }}>
                <TextArea
                  rows={4}
                  placeholder="Thắng ơi, bạn đang muống đăng gì thế?"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="file"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                style={{ margin: 0 }}
              >
                <Dragger>
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
                </Dragger>
              </Form.Item>
            </Col>
            <Col span={0}>
              <Image
                alt="anh"
                style={{ display: 'none' }}
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            </Col>
            <Col span={24}>
              <Button type="primary" style={{ width: '100%' }}>
                Đăng
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
