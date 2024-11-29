import { useState } from 'react';

const useViewMode = (initialMode = "grid") => {
  const [viewMode, setViewMode] = useState(initialMode);

  const setGridMode = () => setViewMode("grid");
  const setListMode = () => setViewMode("list");

  return {
    viewMode,
    setGridMode,
    setListMode
  };
};

export default useViewMode;
