import { PureComponent } from 'react';
import { CircularProgress } from 'react-md';

export default class Loading extends PureComponent {
  render() {
    return (
      <CircularProgress
        id="app-progress"
        scale={3}
        centered
      />
    );
  }
}
