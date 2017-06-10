import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField as MaterialTextField } from 'react-md';

export class TextField extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
  }

  render() {
    const { input, meta, type } = this.props;

    return (
      <MaterialTextField {...input} type={type} />
    );
  }
}

export default TextField;
