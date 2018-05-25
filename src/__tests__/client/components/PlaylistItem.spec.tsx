import React from 'react';
import { shallow } from 'enzyme';
import PlaylistItem from '@client/components/PlaylistItem';
import { PlaylistInterface } from '@client/store/playlist';

describe('<PlaylistItem />', () => {
  test('should render component', () => {
    const props = {
      playlist: { id: 1, name: 'playlistName' } as PlaylistInterface,
      onRemove: jest.fn(),
      onEdit: jest.fn(),
      removing: false,
    };

    const wrapper = shallow(<PlaylistItem {...props} />);
    const event = { stopPropagation: jest.fn() };

    window.confirm = jest.fn(() => true)

    wrapper.find('.edit').simulate('click', event);
    wrapper.find('.remove').simulate('click', event);

    expect(wrapper).toMatchSnapshot();
    expect(props.onEdit).toBeCalled();
    expect(props.onRemove).toBeCalled();
    expect(event.stopPropagation).toHaveBeenCalledTimes(2);
  });
});
