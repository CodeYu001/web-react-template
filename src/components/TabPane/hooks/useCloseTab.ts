import { useCallback } from 'react';
import { useHistory, useAliveController, useModel } from 'umi';
import pathToRegexp from 'path-to-regexp';
import { isHomePath } from '../TabMenu';

const useCloseTab = (tabPanes: any[], path: string) => {
  const history = useHistory();
  const { updateTabPanes } = useModel('global');
  const { dropScope } = useAliveController();

  const close = useCallback(
    (key: string) => {
      const currentIndex = tabPanes.findIndex((pane) => pane.displayPath === key);
      const keeperKey = pathToRegexp(tabPanes[currentIndex].keeperKey);
      const currentPanes = tabPanes.filter((pane) => pane.displayPath !== key);

      if (currentPanes.length === 0) {
        if (isHomePath(key) && isHomePath(path)) {
          return;
        }
        updateTabPanes(currentPanes);
        const unlisten = history.listen(() => {
          unlisten && unlisten();
          setTimeout(() => {
            dropScope(keeperKey);
          }, 60);
        });
        history.push('/');
      } else {
        updateTabPanes(currentPanes);
        if (key === path) {
          const unlisten = history.listen(() => {
            unlisten && unlisten();
            setTimeout(() => {
              dropScope(keeperKey);
            }, 60);
          });
          if (currentIndex === currentPanes.length) {
            history.push(currentPanes[currentIndex - 1].displayPath);
          } else {
            history.push(currentPanes[currentIndex].displayPath);
          }
        } else {
          dropScope(keeperKey);
        }
      }
    },
    [tabPanes, path],
  );

  return close;
};

export default useCloseTab;
