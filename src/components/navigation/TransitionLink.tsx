import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useRouteTransition } from '../loading/RouteTransition';

interface TransitionLinkProps extends Omit<LinkProps, 'onClick'> {
  delay?: number;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}


const TransitionLink: React.FC<TransitionLinkProps> = ({ 
  to, 
  children, 
  delay = 100, 
  onClick,
  ...rest 
}) => {
  const { startTransition } = useRouteTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof to === 'string' && (to.startsWith('http') || to.startsWith('#'))) {
      onClick?.(e);
      return;
    }

    e.preventDefault();
    startTransition();

    onClick?.(e);

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
