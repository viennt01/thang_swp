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
} from 'antd';
import React, { ChangeEvent, useEffect } from 'react';
import { Comment } from 'semantic-ui-react';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentNewFeed, LikeNewFeed } from './fetcher';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import { API_NEW_FEEDS } from '@/fetcherAxios/endpoint';
import { formatDate } from '@/utils/format';

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;
interface Props {
  modalData: any;
  loadingData: any;
}
export default function ModalComment({ modalData, loadingData }: Props) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const handleTextAreaPressEnter = (e: { key: string }) => {
    if (e.key === 'Enter') {
      const data = {
        userID: appLocalStorage.get(LOCAL_STORAGE_KEYS.ID_USER),
        newsFeedID: modalData?.newsFeedID,
        content: form.getFieldValue('comment'),
      };
      commentMutation.mutate(data);
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
        queryKey: [API_NEW_FEEDS.GET_NEWS_FEED_BY_ID],
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
        queryKey: [API_NEW_FEEDS.GET_NEWS_FEED_BY_ID],
      });
      form.resetFields();
    },
  });
  useEffect(() => {
    form.resetFields();
  }, [modalData]);

  return (
    <>
      <Row justify={'center'} style={{ display: !loadingData ? 'none' : '' }}>
        <Col>
          <Spin />
        </Col>
      </Row>
      <div style={{ display: loadingData ? 'none' : '' }}>
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
            <Title level={4}>{modalData?.userName}</Title>
            <Text type="secondary">
              {formatDate(Number(modalData?.insertDated))}
            </Text>
          </Space>
        </Space>
        <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}>
          {modalData?.content}
        </Paragraph>
        <Image
          alt="anh"
          style={{ marginBottom: '16px' }}
          src={modalData?.images[0].urlImage}
        />
        <Space size={16}>
          <Space
            onClick={() => {
              const data = {
                userID: appLocalStorage.get(LOCAL_STORAGE_KEYS.ID_USER),
                newsFeedID: modalData?.newsFeedID,
              };
              likeMutation.mutate(data);
            }}
          >
            <LikeOutlined style={{ cursor: 'pointer' }} />
            {modalData?.likeQuantity}
          </Space>
          <Space>
            <MessageOutlined />
          </Space>
        </Space>
        <Comment.Group>
          {modalData?.commentDTOs?.map((item: any) => {
            return (
              <Comment key={item?.commentID}>
                {/* <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" /> */}
                <Space size={10}>
                  <Space
                    style={{ display: 'flex', top: '0px', marginTop: '-10px' }}
                  >
                    <Avatar size={35}>T</Avatar>
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
      </div>
    </>
  );
}
