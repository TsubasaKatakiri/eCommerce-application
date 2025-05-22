import { useEffect, useState } from 'react';

export const useScreenSize = (): boolean => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const BREAKPOINT = 640;

  useEffect(() => {
    const handleWindowResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return (): void => window.removeEventListener('resize', handleWindowResize);
  });

  return windowWidth <= BREAKPOINT;
};
