import React, { useEffect, useState } from 'react';
import { history, useModel } from 'umi';
import ParticlesBg from 'particles-bg';
import { message, Tabs } from 'antd';
import { loginByCode, loginByPassword } from '@/services/global';
import PasswordForm from './components/PasswordForm';
import CodeForm from './components/CodeForm';
import LoginHeader from './components/LoginHeader';
import styles from './index.less';

const { TabPane } = Tabs;
const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
      });
    }
  };

  const onPasswordLogin = async (username: string, password: string) => {
    setLoading(true);
    try {
      const res = await loginByPassword({ username, password });
      if (res.code === 200) {
        message.success('登录成功');
        localStorage.setItem('token', res.token);
        await fetchUserInfo();
        goto();
      }
    } catch (error) {
      message.error('登录失败，请重试!');
    }
    setLoading(false);
  };

  const onCodeLogin = async (phone: string, code: string) => {
    setLoading(true);
    try {
      const res = await await loginByCode({ phone, code });
      if (res.code === 200) {
        message.success('登录成功');
        localStorage.setItem('token', res.token);
        await fetchUserInfo();
        goto();
      }
    } catch (error) {
      message.error('登录失败，请重试!');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <LoginHeader title="Umi Admin" className={styles.loginHeader} />
        <Tabs centered>
          <TabPane tab="账号密码登陆" key="password">
            <PasswordForm onLogin={onPasswordLogin} loading={loading} />
          </TabPane>
          <TabPane tab="验证码登陆" key="code">
            <CodeForm onLogin={onCodeLogin} loading={loading} />
          </TabPane>
        </Tabs>
      </div>
      {mounted ? <ParticlesBg bg type="circle" /> : null}
    </div>
  );
};

export default Login;
