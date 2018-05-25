import React from 'react';
import { shallow } from 'enzyme';
import PlaylistView from '@client/components/PlaylistView';
import { PlaylistInterface } from '@client/store/playlist';
import { TrackInterface } from '@client/store/track';

describe('<PlaylistView />', () => {
  const defaultProps = {
    playlist: { id: 1, name: 'test' } as PlaylistInterface,
    playlistId: 1,
    tracks: [
      { id: 1, name: 'test' } as TrackInterface,
    ],
  };

  test('should render component', () => {
    const props = { ...defaultProps };
    const wrapper = shallow(<PlaylistView {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when tracks are missing', () => {
    test('should render message', () => {
      const props = { ...defaultProps, tracks: [] as TrackInterface[] };
      const wrapper = shallow(<PlaylistView {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
