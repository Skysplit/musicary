import React from 'react';
import { shallow } from 'enzyme';
import SignupPage from '@client/pages/user/signup';

describe('<SignupPage />', () => {
  test('should render page', () => {
    const wrapper = shallow(<SignupPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
