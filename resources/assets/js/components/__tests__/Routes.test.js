import { Routes } from '../Routes';

describe('<Routes />', () => {
  const defaultProps = {
    history: {},
  };

  const setup = buildSetup(Routes, defaultProps);

  test('renders', () => {
    expect(setup().wrapper).toMatchSnapshot();
  });
});
