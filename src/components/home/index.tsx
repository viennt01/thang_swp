import React, { useState, useEffect } from 'react';
import { Avatar, Col, List, Modal, Row, Space, Typography, Image } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import ModalComment from './modal-comment';
const { Title, Text, Paragraph } = Typography;
const initialData = Array.from({ length: 5 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description: '1hour ago',
  content:
    'We supply a series of design principles, practical patterns and high-quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({
  icon,
  text,
  onClick,
}: {
  icon: React.FC;
  text: string;
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
  const [data, setData] = useState(initialData);
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreData = () => {
    // Simulate loading more data here
    setTimeout(() => {
      const newData = [...data, ...initialData];
      setData(newData);
      setHasMore(newData.length < 5); // Change this condition as needed
    }, 5000); // You can adjust the delay
  };

  useEffect(() => {
    // Initially, you can load more data
    fetchMoreData();
  }, []);

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

  return (
    <div style={{ margin: '15px 0' }}>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more items</p>}
      >
        <List
          itemLayout="vertical"
          size="large"
          pagination={false}
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[
                <IconText
                  icon={LikeOutlined}
                  text="156"
                  key="list-vertical-like-o"
                />,
                <IconText
                  icon={MessageOutlined}
                  text="2"
                  key="list-vertical-message"
                  onClick={() => {
                    showModal();
                  }}
                />,
              ]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </InfiniteScroll>
      <Modal
        title={
          <Row justify={'center'}>
            <Col>
              <Title level={3} style={{ margin: '-10px 0' }}>
                Bài viết của Thắng
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
            <Text type="secondary">2 hour ago</Text>
          </Space>
        </Space>
        <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}>
          Ant Design, a design language for background applications, is refined
          by Ant UED Team. Ant Design, a design language for background
          applications, is refined by Ant UED Team. Ant Design, a design
          language for background applications, is refined by Ant UED Team. Ant
          Design, a design language for background applications, is refined by
          Ant UED Team. Ant Design, a design language for background
          applications, is refined by Ant UED Team. Ant Design, a design
          language for background applications, is refined by Ant UED Team.
        </Paragraph>
        <Image
          alt="anh"
          style={{ marginBottom: '16px' }}
          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        />
        <ModalComment />
      </Modal>
    </div>
  );
}
