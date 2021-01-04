import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { Form, Button, Input, message, Col, Row } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { getAuthCode } from '@/services/global';

type LoginProps = {
  onLogin: (username: string, password: string) => void;
  loading?: boolean;
};

const CodeForm: React.FC<LoginProps> = ({ onLogin, loading }) => {
  const [state, setState] = useImmer({
    authTime: 0,
    submitDisabled: true,
  });
  const [form] = Form.useForm();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state.authTime > 0) {
      timer = setTimeout(() => {
        setState((state) => {
          state.authTime -= 1;
        });
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [state.authTime, setState]);

  const authCode = async () => {
    if (state.authTime) return;
    await form.validateFields(['phone']);
    setState((state) => {
      state.authTime = 60;
    });
    const res = await getAuthCode(form.getFieldValue('phone'));
    if (res) {
      message.success({
        duration: 60,
        content: `验证码为 ${res.authCode}（忽略大小写）`,
      });
    }
  };

  const handleLogin = (valuse: AnyObject<string>) => {
    const { phone, code } = valuse;
    onLogin(phone, code);
  };

  return (
    <Form
      form={form}
      initialValues={{
        phone: '18682332253',
      }}
      labelCol={{
        span: 5,
      }}
      onFinish={handleLogin}
      onFieldsChange={(currents) => {
        const current = currents[0];
        if (current && current.name.toString() === 'code') {
          if (current.value.length === 4) {
            setState((state) => {
              state.submitDisabled = false;
            });
          } else {
            setState((state) => {
              state.submitDisabled = true;
            });
          }
        }
      }}
    >
      <Form.Item
        name="phone"
        label="手机号"
        rules={[
          {
            required: true,
            message: '请输入正确的手机号',
            pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
            whitespace: true,
          },
        ]}
      >
        <Input
          prefix={<span style={{ color: '#aaa' }}>+86</span>}
          placeholder="Phone"
          autoComplete="on"
        />
      </Form.Item>
      <Form.Item label="验证码" required>
        <Row align="middle" justify="space-between">
          <Col span={14}>
            <Form.Item
              noStyle
              name="code"
              rules={[
                {
                  required: true,
                  message: '请输入4位验证码',
                  whitespace: true,
                  len: 4,
                },
              ]}
            >
              <Input prefix={<StarOutlined />} placeholder="AuthCode" autoComplete="off" />
            </Form.Item>
          </Col>
          <Col span={9} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button disabled={state.authTime > 0} type="primary" onClick={authCode}>
              {state.authTime ? `${state.authTime}s 后可再次获取` : '获取验证码'}
            </Button>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item>
        <Button
          style={{ width: '100%' }}
          type="primary"
          disabled={state.submitDisabled}
          htmlType="submit"
          loading={loading}
        >
          {loading ? '正在' : ''}登陆
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CodeForm;
