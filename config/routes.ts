/**
 * 注意:
 * 1、wrappers: ['@/components/KeepAlive'],必须添加
 * 2、keppAlive 是否缓存当前页面
 * 3、keepAliveName 为国际化请保证以menu开头拼接
 * 4、saveScrollPosition 是否缓存滚动条位置，详情：https://github.com/CJY0208/react-activation/blob/master/README_CN.md
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
    wrappers: ['@/components/KeepAlive'],
    keppAlive: false,
    keepAliveName: '欢迎'
  },
  {
    path: '/welcome1',
    name: 'welcome1',
    icon: 'smile',
    component: './Welcome',
    wrappers: ['@/components/KeepAlive'],
    keppAlive: true,
    keepAliveName: '欢迎1'
  },
  {
    path: '/welcome11',
    name: 'welcome11',
    icon: 'smile',
    component: './Welcome',
    wrappers: ['@/components/KeepAlive'],
    keppAlive: true,
    keepAliveName: '欢迎111'
  },
  {
    path: '/welcome2',
    name: 'welcome2',
    icon: 'smile',
    component: './Welcome',
    wrappers: ['@/components/KeepAlive'],
    keppAlive: true,
    keepAliveName: '欢迎12'
  },
  {
    path: '/welcome3',
    name: 'welcome3',
    icon: 'smile',
    component: './Welcome',
    wrappers: ['@/components/KeepAlive'],
    keppAlive: true,
    keepAliveName: '欢迎3'
  },
  {
    path: '/welcome4',
    name: 'welcome4',
    icon: 'smile',
    component: './Welcome',
    wrappers: ['@/components/KeepAlive'],
    keppAlive: true,
    keepAliveName: '欢迎14'
  },
  {
    path: '/welcome5',
    name: 'welcome5',
    icon: 'smile',
    component: './Welcome',
    wrappers: ['@/components/KeepAlive'],
    keppAlive: true,
    keepAliveName: '欢迎15'
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
        wrappers: ['@/components/KeepAlive'],
        keppAlive: true,
        keepAliveName: '子页面'
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
    keppAlive: true,
    wrappers: ['@/components/KeepAlive'],
    keepAliveName: '列表页'
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
