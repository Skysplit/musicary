import React from 'react';
import { shallow } from 'enzyme';
import { PlaylistViewPage } from '@client/pages/playlist/view';
import { PlaylistInterface } from '@client/store/playlist';

describe('<PlaylistsViewPage />', () => {
  const defaultProps = {
    fetchTracksSuccess: () => {},
    setSinglePlaylist: () => {},
    playlist: {
      id: 1,
    } as PlaylistInterface,
  };

  test('should render component', () => {
    const props = { ...defaultProps };
    const wrapper = shallow(<PlaylistViewPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
