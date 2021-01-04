import { request } from 'umi';

export function reqLoginByPassword({ username, password }: {
  username: string;
  password: string;
}) {
  return request('/login/password', {
    method: 'POST',
    data: {
      username,
      password,
    },
  });
}

export function reqGetAuthCode(phone: string) {
  return request('/getAuthCode', {
    params: { phone },
  });
}

export function reqLoginByCode({ phone, code }: {
  phone: string;
  code: string;
}) {
  return request('/login/code', {
    method: 'post',
    data: {
      phone,
      code,
    },
  });
}

export function queryCurrent() {
  return request('/api/currentUser');
}
