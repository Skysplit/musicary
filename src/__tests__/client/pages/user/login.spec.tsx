import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from '@client/pages/user/login';

describe('<LoginPage />', () => {
  test('should render page', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
