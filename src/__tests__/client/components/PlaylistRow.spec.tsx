import React from 'react';
import { shallow } from 'enzyme';
import PlaylistRow from '@client/components/PlaylistRow';
import { PlaylistInterface } from '@client/store/playlist';

describe('<PlaylistRow />', () => {
  const defaultProps = {
    playlist: { id: 1, name: 'test' } as PlaylistInterface,
    edit: true,
    removing: true,
    onRemove(playlist: any): any {},
    onSave(playlist: any): any {},
    onSaved(playlist: any): any {},
    onEditStart() {},
    onEditCancel() {},
  };

  test('should render form component', () => {
    const props = { ...defaultProps };
    const wrapper = shallow(<PlaylistRow {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render item component', () => {
    const props = { ...defaultProps, edit: false };
    const wrapper = shallow(<PlaylistRow {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
