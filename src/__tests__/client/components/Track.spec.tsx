import React from 'react';
import { shallow } from 'enzyme';
import Track from '@client/components/Track';
import { PlaylistInterface } from '@client/store/playlist';
import { TrackInterface } from '@client/store/track';

describe('<Track />', () => {
  const defaultProps = {
    track: { id: 1, name: 'TrackName' } as TrackInterface,
    active: true,
    playlist: { } as PlaylistInterface,
    onClick: jest.fn() as (track: TrackInterface) => void,
  };

  test('should render component', () => {
    const props = { ...defaultProps };
    const wrapper = shallow(<Track {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when track is not active', () => {
    test('should display different component state', () => {
      const props = { ...defaultProps, active: false };
      const wrapper = shallow(<Track {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
