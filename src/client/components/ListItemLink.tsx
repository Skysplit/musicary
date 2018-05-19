import React, { SFC, Fragment, ReactNode } from 'react';
import Link from '@app/next/link';
import { LinkProps } from 'next-routes';
import { ListItemProps } from 'react-md';

export type LinkComponentProps = Partial<LinkProps> & Partial<ListItemProps> & {
  children: ReactNode,
};

const ListItemLink: SFC<LinkComponentProps> = ({
  children,
  route,
  shallow,
  prefetch,
  itemRef,
  passHref = false,
  ...props,
}) => {
  return (
    <Link passHref={passHref} route={route}>
      <div {...props}>
        <Fragment>
          {children}
        </Fragment>
      </div>
    </Link>
  );
};

export default ListItemLink;
