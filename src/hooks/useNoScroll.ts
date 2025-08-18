import { useEffect } from 'react';

/**
 * A hook that prevents scrolling on the page while a component is mounted.
 * Useful for full-screen modals and auth pages.
 */
export const useNoScroll = () => {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, []);
};

export default useNoScroll;