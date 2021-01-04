import { useState, useCallback } from 'react';

export default function useGlobalModel() {
  const [tabKey, setTabKey] = useState<string>('');
  const [tabPanes, setTabPanes] = useState<any[]>([]);

  const updateTabPanes = useCallback(() => {
    setTabPanes(tabPanes);
  }, [tabPanes]);

  const updateTabKey = useCallback(() => {
    setTabKey(tabKey);
  }, [tabKey]);

  return {
    tabKey,
    tabPanes,
    updateTabKey,
    updateTabPanes,
  };
}
