import { useState, useCallback } from 'react';

export default function useGlobalModel() {
  const [tabKey, setTabKey] = useState<string>('');
  const [tabPanes, setTabPanes] = useState<any[]>([]);

  const updateTabPanes = useCallback((tabPanes) => {
    setTabPanes(tabPanes);
  }, [])

  return {
    tabKey,
    tabPanes,
    updateTabPanes,
  }
}
