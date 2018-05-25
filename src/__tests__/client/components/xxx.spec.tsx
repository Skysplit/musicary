import React from 'react';
import { shallow } from 'enzyme';
import App from '@client/components/App';

describe('<App />', () => {
  test('should render component', () => {
    const wrapper = shallow(<App user={{ id: 'test' }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
