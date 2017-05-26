import { App } from '../App';

describe('<App />', () => {
  const defaultProps = {};
  const setup = buildSetup(App, defaultProps);

  test('renders', () => {
    expect(setup().wrapper).toMatchSnapshot();
  });
});
