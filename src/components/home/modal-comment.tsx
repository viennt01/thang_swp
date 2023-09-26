import { Avatar, Space, Form, Input } from 'antd';
import React from 'react';
import { Comment } from 'semantic-ui-react';
import { LikeOutlined, MessageOutlined, SendOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export default function ModalComment() {
  const handleTextAreaPressEnter = (e: { key: string }) => {
    // Kiểm tra xem phím Enter đã được ấn hay không
    if (e.key === 'Enter') {
      // Thực hiện xử lý gửi biểu mẫu ở đây
      // Ví dụ: dispatch action hoặc gọi hàm xử lý gửi dữ liệu
      console.log('Enter key pressed. Submitting form...');
    }
  };
  return (
    <>
      <Space size={16}>
        <Space
        // onClick={onClick}
        // style={spaceStyle}
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
        >
          {React.createElement(LikeOutlined)}156
        </Space>
        <Space
        // onClick={onClick}
        // style={spaceStyle}
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
        >
          {React.createElement(MessageOutlined)}2
        </Space>
      </Space>
      <Comment.Group>
        <Comment>
          {/* <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" /> */}
          <Space size={10}>
            <Space style={{ display: 'flex', top: '0px' }}>
              <Avatar size={30}>T</Avatar>
            </Space>
            <Comment.Content>
              <Comment.Author as="a">Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Space>
        </Comment>

        <Comment>
          <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
          <Comment.Content>
            <Comment.Author as="a">Elliot Fu</Comment.Author>
            <Comment.Metadata>
              <div>Yesterday at 12:30AM</div>
            </Comment.Metadata>
            <Comment.Text>
              <p>This has been very useful for my research. Thanks as well!</p>
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
          <Comment.Group>
            <Comment>
              <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
              <Comment.Content>
                <Comment.Author as="a">Jenny Hess</Comment.Author>
                <Comment.Metadata>
                  <div>Just now</div>
                </Comment.Metadata>
                <Comment.Text>Elliot you are always so right :)</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        </Comment>

        <Form>
          <Form.Item name="comment">
            <TextArea rows={2} onPressEnter={handleTextAreaPressEnter} />
            <SendOutlined
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '8px',
              }}
            />
          </Form.Item>
        </Form>
      </Comment.Group>
    </>
  );
}
