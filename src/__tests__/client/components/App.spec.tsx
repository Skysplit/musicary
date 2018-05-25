import React from 'react';
import { shallow } from 'enzyme';
import App from '@client/components/App';

describe('<App />', () => {
  test('should render user interface', () => {
    const wrapper = shallow(<App user={{ id: 'test' }} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render guest interface', () => {
    const wrapper = shallow(<App user={null} />);
    expect(wrapper).toMatchSnapshot();
  });
});
