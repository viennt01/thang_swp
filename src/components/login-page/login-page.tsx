import style from './login.module.scss';
import { Button, Form, Input } from 'antd';

import Link from 'next/link';
import { ROUTERS } from '@/constant/router';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constant/localstorage';
import router from 'next/router';
export default function LoginPage() {
  const [formLogin] = Form.useForm();

  const onFinish = () => {
    appLocalStorage.set(LOCAL_STORAGE_KEYS.TOKEN, '1');
    router.push(ROUTERS.HOME);
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
          // initialValues={initialValues}
          onFinish={onFinish}
          style={{ width: '100%' }}
        >
          <div className={style.titleSignIn}>
            <h2>Sign in</h2>
            <h2>Sign in</h2>
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
