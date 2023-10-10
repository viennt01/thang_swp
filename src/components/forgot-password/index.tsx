import style from './login.module.scss';
import Link from 'next/link';
import { ROUTERS } from '@/constant/router';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { ResetPassword, confirmEmail } from './fetcher';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
import { ConfirmEmailForm, ResetPasswordForm } from './interface';
import { useState } from 'react';
import router from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { Button, Col, Form, Input, Row } from 'antd';

export default function ForgotPassword() {
  const [formRegister] = Form.useForm();
  const [formConfirmEmail] = Form.useForm();
  const [isRegisterDone, setIsRegisterDone] = useState(false);

  const resetPasswordMutation = useMutation({
    mutationFn: (body: ResetPasswordForm) => {
      return ResetPassword(body);
    },
  });

  const confirmEmailMutation = useMutation({
    mutationFn: (body: ConfirmEmailForm) => {
      return confirmEmail(body);
    },
  });

  const onFinishRegister = (value: ResetPasswordForm) => {
    const data = {
      ...value,
    };

    resetPasswordMutation.mutate(data, {
      onSuccess: function () {
        successToast('Please check your Email');
        setIsRegisterDone(true);
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
      password: value.password,
    };

    confirmEmailMutation.mutate(data, {
      onSuccess: function () {
        successToast('Reset password Success');
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
          <img src="/images/logo.png" alt="" className={style.signinLogo} />
        </Link>

        <Form
          form={formRegister}
          name="formLogin"
          onFinish={onFinishRegister}
          style={{ width: '100%' }}
        >
          <div className={style.titleSignIn}>
            <h2>Reset Password</h2>
            <h2 style={{ margin: '0px' }}>Reset Password</h2>
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
          </Row>

          <Button
            className={style.btnLogin}
            htmlType="submit"
            style={{ width: '100%', marginTop: '15px' }}
            loading={resetPasswordMutation.isLoading}
          >
            Send
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
          <img src="/images/logo.png" alt="" className={style.signinLogo} />
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
            RESET PASSWORD
          </Button>
        </Form>
      </div>
    </div>
  );
}
