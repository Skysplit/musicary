import React from 'react';
import { PlaylistsPage } from '@client/pages/playlist/index';
import { shallow } from 'enzyme';

describe('pages/home', () => {
  const defaultProps = {
    fetchPlaylistsSuccess: () => {},
  };

  test('should render component', () => {
    const wrapper = shallow(<PlaylistsPage {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render error page', () => {
    const props = {
      errorCode: 401,
    };

    const wrapper = shallow(<PlaylistsPage {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('should send action when playlist are fetched', () => {
    const props = {
      fetchPlaylistsSuccess: jest.fn(),
      playlists: ['playlist1', 'playlist2'],
    };

    const wrapper = shallow(<PlaylistsPage {...props} />);

    expect(props.fetchPlaylistsSuccess).toHaveBeenCalledWith(props.playlists);
  });
});
