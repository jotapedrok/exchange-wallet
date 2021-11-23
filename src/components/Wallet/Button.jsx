import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { clickFunc, testId, text } = this.props;
    return (
      <button
        type="button"
        data-testid={ testId }
        onClick={ clickFunc }
      >
        {text}
      </button>
    );
  }
}

Button.propTypes = {
  clickFunc: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
