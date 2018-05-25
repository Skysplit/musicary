import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '@client/components/LoginForm';

describe('<LoginForm />', () => {
  const defaultProps = {
    handleChange: () => {},
    values: {
      email: 'test@email.com',
      password: 'testPassword',
    },
    errors: {
      email: 'error',
      password: 'error',
    },
  };
  test('should render component', () => {
    const props = {
      ...defaultProps,
    };

    const wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
