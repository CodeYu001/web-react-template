import type { Effect, Reducer } from 'umi';
import { queryCurrent } from '@/services/global';

export type CurrentUser = {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
};

export type UserModelState = {
  currentUser?: CurrentUser;
}

export type UserModelType = {
  namespace: string;
  state: UserModelState;
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
  };
  effects: {
    fetchCurrent: Effect;
  };
}

const UserModel: UserModelType = {
  namespace: 'permission',
  state: {
    currentUser: {},
  },
  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
};

export default UserModel;
