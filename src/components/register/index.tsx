import style from './login.module.scss';
import { Button, Col, DatePicker, Form, Input, Row } from 'antd';

import Link from 'next/link';
import { ROUTERS } from '@/constant/router';
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  HomeOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { confirmEmail, register } from './fetcher';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { ConfirmEmailForm, RegisterForm } from './interface';
import { useState } from 'react';
import router from 'next/router';
import { useMutation } from '@tanstack/react-query';

const dateFormat = 'YYYY/MM/DD';

export default function Register() {
  const [formRegister] = Form.useForm();
  const [formConfirmEmail] = Form.useForm();
  const [isRegisterDone, setIsRegisterDone] = useState(false);

  const registerMutation = useMutation({
    mutationFn: (body: RegisterForm) => {
      return register(body);
    },
  });

  const confirmEmailMutation = useMutation({
    mutationFn: (body: ConfirmEmailForm) => {
      return confirmEmail(body);
    },
  });

  const onFinishRegister = (value: RegisterForm) => {
    const data = {
      ...value,
      birthDated: value.birthDated.valueOf(),
    };

    registerMutation.mutate(data, {
      onSuccess: function (data) {
        console.log('success', data);
        if ((data as unknown as string) === 'Create Account Success') {
          successToast('Create Account Success');
          setIsRegisterDone(true);
        } else {
          errorToast(data as unknown as string);
        }
      },
      onError() {
        errorToast(API_MESSAGE.ERROR);
      },
    });
  };

  const onFinishConfirmEmail = (value: ConfirmEmailForm) => {
    const data = {
      email: formRegister.getFieldValue('email'),
      otp: value.otp,
    };

    confirmEmailMutation.mutate(data, {
      onSuccess: function () {
        successToast('Create Account Success');
        router.push(ROUTERS.LOGIN);
      },
      onError() {
        errorToast(API_MESSAGE.ERROR);
      },
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '85vh',
      }}
    >
      <div
        className={style.signinForm}
        style={{
          display: !isRegisterDone ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link href={ROUTERS.LOGIN}>
          <img src="/images/logo-fpt.png" alt="" className={style.signinLogo} />
        </Link>

        <Form
          form={formRegister}
          name="formLogin"
          // initialValues={initialValues}
          onFinish={onFinishRegister}
          style={{ width: '100%' }}
        >
          <div className={style.titleSignIn}>
            <h2>Sign up</h2>
            <h2 style={{ margin: '0px' }}>Sign up</h2>
          </div>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<MailOutlined />}
                  placeholder="Email"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your first name!',
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="First Name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your last name!',
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Last Name"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your full name!',
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Full Name"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: 'Please input your address!',
                  },
                ]}
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
                name="birthDated"
                rules={[
                  {
                    required: true,
                    message: 'Please input your birth dated!',
                  },
                ]}
              >
                <DatePicker
                  size="large"
                  showToday
                  format={dateFormat}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Button
            className={style.btnLogin}
            htmlType="submit"
            style={{ width: '100%', marginTop: '15px' }}
            loading={registerMutation.isLoading}
          >
            Login
          </Button>
        </Form>
      </div>

      <div
        className={style.signinForm}
        style={{
          display: isRegisterDone ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link href={ROUTERS.LOGIN}>
          <img src="/images/logo-fpt.png" alt="" className={style.signinLogo} />
        </Link>

        <Form
          form={formConfirmEmail}
          name="formLogin"
          onFinish={onFinishConfirmEmail}
          style={{ width: '100%' }}
        >
          <div className={style.titleSignIn}>
            <h2>Confirm Email</h2>
            <h2 style={{ margin: '0px' }}>Confirm Email</h2>
          </div>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="otp"
                rules={[
                  {
                    required: true,
                    message: 'Please input your OTP!',
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="OTP"
                />
              </Form.Item>
            </Col>
          </Row>

          <Button
            className={style.btnLogin}
            htmlType="submit"
            style={{ width: '100%', marginTop: '15px' }}
            loading={confirmEmailMutation.isLoading}
          >
            CONFIRM EMAIL
          </Button>
        </Form>
      </div>
    </div>
  );
}
