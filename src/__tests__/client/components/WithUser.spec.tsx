import React from 'react';
import { shallow } from 'enzyme';
import WithUser from '@client/components/WithUser';
import { UserInterface } from '@client/store/user';

describe('<WithUser />', () => {
  test('should render component', () => {
    const props = {
      user: { id: 1, email: 'test' } as UserInterface,
      children: jest.fn(user => <span>{user.id} {user.email}</span>),
    };
    const wrapper = shallow(<WithUser {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
