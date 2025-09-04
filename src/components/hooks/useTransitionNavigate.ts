import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRouteTransition } from '../loading/RouteTransition';

/**
 * Custom hook for handling route transitions with a loading effect
 * 
 * @returns An object with a navigateWithTransition function
 */
export const useTransitionNavigate = () => {
  const navigate = useNavigate();
  const { startTransition } = useRouteTransition();

  const navigateWithTransition = useCallback((
    to: string, 
    options?: { replace?: boolean, state?: any, delay?: number }
  ) => {
    startTransition();
    const { delay = 800, ...navigateOptions } = options || {};
    
    // Delay the actual navigation to show the transition
    setTimeout(() => {
      navigate(to, navigateOptions);
    }, delay);
  }, [navigate, startTransition]);

  return { navigateWithTransition };
};

export default useTransitionNavigate;
