import React from 'react';
import HomePage from '@client/pages/home';
import { shallow } from 'enzyme';

describe('pages/home', () => {
  test('should render component', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper).toMatchSnapshot();
  });
});
