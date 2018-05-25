
import React from 'react';
import { shallow } from 'enzyme';
import ListItemLink, { ListItemLinkProps } from '@client/components/ListItemLink';

describe('<ListItemLink />', () => {
  test('should render component', () => {
    const props = {
      children: <span>test</span>,
      route: 'test',
      shallow: true,
      prefetch: true,
      passHref: true,
      propsToDiv: 'propInDiv',
    } as ListItemLinkProps;
    const wrapper = shallow(<ListItemLink {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
