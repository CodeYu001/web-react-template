import type React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, matchPath, useModel } from 'umi';
import type { IRouteComponentProps, IRoute } from 'umi';

export type LayoutRoute = IRoute & {
  parentKey: string | null;
  level: number;
  name: string;
  displayPath: string;
  keeperKey: string;
};

function pushTabPane(tabPanes: LayoutRoute[], pane: LayoutRoute, path: string) {
  pane = { ...pane, displayPath: path };
  const idx = tabPanes.findIndex((item) =>
    matchPath(item.displayPath, {
      path,
      exact: true,
    }),
  );
  if (idx === -1) {
    return [...tabPanes, pane];
  }
  const clone = [...tabPanes];
  clone.splice(idx, 1, pane);
  return clone;
}

const flatMenus = (
  convertedMenus: AnyObject<LayoutRoute[]> = {},
  menu: IRoute,
  level: number = 1,
  parentKey: null | string = null,
) => {
  const displayPath = menu.externalPath || menu.redirect || menu.path;
  if (displayPath) {
    const key = menu.key || menu.externalPath || menu.path;
    if (!key) return;

    menu.displayPath = displayPath;
    menu.parentKey = parentKey;
    menu.level = level;
    menu.keeperKey = menu.keepAlive?.name || displayPath;

    if (parentKey !== key) {
      convertedMenus[key] = [menu as LayoutRoute];
    } else {
      convertedMenus[key].push(menu as LayoutRoute);
    }

    if (menu.routes && Array.isArray(menu.routes)) {
      menu.routes.forEach((route) => {
        flatMenus(convertedMenus, route, level + 1, key);
      });
    }
  }
};

const RouteLayoutWrapper: React.FC<
  IRouteComponentProps & {
    routes: IRoute[];
  }
> = ({ children, routes }) => {
  const { pathname, search } = useLocation();
  const path = pathname + search;

  const [pathsMap, setPathsMap] = useState<AnyObject<LayoutRoute>>({});
  const { tabPanes, updateTabPanes, updateTabKey } = useModel('global');

  useEffect(() => {
    const pathsMap = routes.reduce((pre, menu) => {
      flatMenus(pre, menu);
      return pre;
    }, {} as LayoutRoute);

    setPathsMap(pathsMap);
  }, [routes]);

  useEffect(() => {
    if (pathsMap[path]) {
      const current = pathsMap[path];
      if (current[current.length - 1].redirect) return;
      if (!current[current.length - 1].routes || !current[current.length - 1].hideInTabs) {
        const tab = current[current.length - 1];
        if (tab.tabName || tab.name) {
          updateTabKey(path);
          updateTabPanes(pushTabPane(tabPanes, tab, path));
        }
      }
    } else {
      Object.keys(pathsMap).some((key) => {
        const pathname = path.split('?')[0];
        if (matchPath(pathname, { path: key, exact: true })) {
          const current = pathsMap[key];
          if (current[current.length - 1].redirect) return;

          if (!current[current.length - 1].routes || !current[current.length - 1].hideInTabs) {
            const tab = current[current.length - 1];
            if (tab.tabName || tab.name) {
              updateTabKey(path);
              updateTabPanes(pushTabPane(tabPanes, tab, path));
            }
          }
        }
      });
    }
  }, [path, pathsMap]);

  return children;
};

export default RouteLayoutWrapper;
