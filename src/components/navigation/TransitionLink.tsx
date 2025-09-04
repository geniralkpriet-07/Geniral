import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useRouteTransition } from '../loading/RouteTransition';

interface TransitionLinkProps extends Omit<LinkProps, 'onClick'> {
  delay?: number;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * A wrapper around Link that triggers the route transition animation
 */
const TransitionLink: React.FC<TransitionLinkProps> = ({ 
  to, 
  children, 
  delay = 100, 
  onClick,
  ...rest 
}) => {
  const { startTransition } = useRouteTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If it's an external link or has an onClick handler, don't interfere
    if (typeof to === 'string' && (to.startsWith('http') || to.startsWith('#'))) {
      onClick?.(e);
      return;
    }

    // For internal links, handle the transition
    e.preventDefault();
    startTransition();

    // Execute any additional onClick handler
    onClick?.(e);

    // Navigate after delay
    setTimeout(() => {
      window.location.href = typeof to === 'string' ? to : to.pathname || '/';
    }, delay);
  };

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
};

export default TransitionLink;
