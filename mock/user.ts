import mockApi from './config';
import { Request, Response } from 'umi';
import { createAuthCode } from './helpers';

let authCode = '';
const phoneReg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;

export default {
  [mockApi('/login/password', 'post')]: (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '123456') {
      setTimeout(() => {
        res.send({ token: '123456', code: 200 });
      }, 2000);
    } else {
      res.send({ msg: '用户名或密码错误', code: 400 });
    }
  },
  [mockApi('/getAuthCode')]: (req: Request, res: Response) => {
    const phone = req.query.phone as string;
    if (phoneReg.test(phone)) {
      authCode = createAuthCode();
      res.send({ authCode, code: 200 });
    } else {
      res.send({ msg: '手机号验证失败，请输入正确的手机号', code: 400 });
    }
  },
  [mockApi('/login/outLogin')]: (req: Request, res: Response) => {
    res.send({ data: null, code: 200 });
  },
  [mockApi('/login/code', 'post')]: (req: Request, res: Response) => {
    if (!authCode) {
      res.send({ msg: '请先获取验证码', code: 400 });
    }
    const { phone, code } = req.body;
    if (phoneReg.test(phone) && code.toLowerCase() === authCode.toLowerCase()) {
      setTimeout(() => {
        res.send({ token: '123456', code: 200 });
        authCode = '';
      }, 2000);
    } else {
      res.send({ msg: '验证码错误', code: 400 });
    }
  },
  [mockApi('/currentUser')]: (req: Request, res: Response) => {
    const { token } = req.headers;
    if (token === '123456') {
      const user = {
        email: '123456@163.com',
        phone: '123456789',
        name: 'admin',
      };
      const roles = ['admin'];
      res.send({ user, roles, code: 200 });
    } else {
      res.send({ msg: '用户登陆信息有误，请重新登陆', code: 401 });
    }
  },
};
