import { request } from 'umi';

export function loginByPassword({ username, password }: { username: string; password: string }) {
  return request('/login/password', {
    method: 'POST',
    data: { username, password },
  });
}

export function loginByCode({ phone, code }: { phone: string; code: string }) {
  return request('/login/code', {
    method: 'post',
    data: { phone, code },
  });
}

export function outLogin() {
  return request('/login/outLogin');
}

export function getAuthCode(phone: string) {
  return request('/getAuthCode', {
    params: { phone },
  });
}

export function queryCurrent() {
  return request<API.CurrentUser>('/currentUser');
}
