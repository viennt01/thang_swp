import React, { useState, useEffect } from 'react';
import { Avatar, Col, List, Modal, Row, Space, Typography } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import ModalComment from './modal-comment';
import { useQuery } from '@tanstack/react-query';
import { API_NEW_FEEDS } from '@/fetcherAxios/endpoint';
import { GetNewFeed, GetNewFeedById } from './fetcher';
import { formatDate } from '@/utils/format';
const { Title } = Typography;

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

export default function Home() {
  const [data, setData] = useState([]);
  const [dataModal, setDataModal] = useState<any>();
  const [idModel, setIdModel] = useState('');
  const [randomAlphabet, setRandomAlphabet] = useState('');

  const getNewFeedMul = useQuery({
    queryKey: [API_NEW_FEEDS.GET_NEWS_FEED],
    queryFn: () => GetNewFeed(),
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
  function generateRandomAlphabetString(length: number): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      result += alphabet.charAt(randomIndex);
    }
    return result;
  }

  useEffect(() => {
    setRandomAlphabet(generateRandomAlphabetString(1));
  }, []);
  return (
    <div style={{ margin: '15px 0' }}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={false}
        dataSource={data}
        renderItem={(item: any) => (
          <List.Item
            key={item.title}
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
                src={item?.images[0].urlImage || ''}
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
                >
                  {randomAlphabet}
                </Avatar>
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
