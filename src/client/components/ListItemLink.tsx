import React, { ReactNode, PureComponent } from 'react';
import Link from '@app/next/link';
import { LinkProps } from 'next-routes';
import { ListItemProps } from 'react-md';

export type ListItemLinkProps = Partial<LinkProps> & Partial<ListItemProps> & {
  children: ReactNode,
};

export default class ListItemLink extends PureComponent<ListItemLinkProps> {
  render() {
    const { children, route, shallow, prefetch, itemRef, passHref = false, ...props } = this.props;

    return (
      <Link
        passHref={passHref}
        route={route}
        shallow={shallow}
        prefetch={prefetch}
      >
        <div {...props}>
          {children}
        </div>
      </Link>
    );
  }
}
