import style from './login.module.scss';
import { Button, Form, Input } from 'antd';

import Link from 'next/link';
import { ROUTERS } from '@/constant/router';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import router from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { LoginForm } from './interface';
import { login } from './fetcher';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constant/message';
export default function LoginPage() {
  const [formLogin] = Form.useForm();

  const loginMutation = useMutation({
    mutationFn: (body: LoginForm) => {
      return login(body);
    },
  });

  const onFinish = (value: LoginForm) => {
    loginMutation.mutate(value, {
      onSuccess: function (data) {
        appLocalStorage.set(LOCAL_STORAGE_KEYS.ID_USER, data.userID as string);
        appLocalStorage.set(
          LOCAL_STORAGE_KEYS.NAME_USER,
          data.firstName as string
        );
        router.push(ROUTERS.HOME);
        successToast('Login Success');
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link href={ROUTERS.LOGIN}>
          <img src="/images/logo-fpt.png" alt="" className={style.signinLogo} />
        </Link>

        <Form
          form={formLogin}
          name="formLogin"
          onFinish={onFinish}
          style={{ width: '100%' }}
        >
          <div className={style.titleSignIn}>
            <h2>Sign in</h2>
            <h2 style={{ margin: '0px' }}>Sign in</h2>
          </div>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input size="large" prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
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

          <div className={style.loginOptions}>
            <div>
              <Link
                href={ROUTERS.FORGOT_PASSWORD}
                className={style.forgotFieldLink}
              >
                Forgot password ?
              </Link>
            </div>
          </div>
          <Button
            className={style.btnLogin}
            loading={loginMutation.isLoading}
            htmlType="submit"
            style={{ width: '100%', marginTop: '15px' }}
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
