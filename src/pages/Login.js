import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputEmail: '',
      inputPassword: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.ableButton = this.ableButton.bind(this);
    this.buttonFunc = this.buttonFunc.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  ableButton() {
    const { inputEmail, inputPassword } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    const FIVE = 5;
    const testEmail = emailRegex.test(inputEmail);
    const testPassword = inputPassword.length > FIVE;
    return testEmail && testPassword;
  }

  buttonFunc(e) {
    e.preventDefault();
    const { history, getEmail } = this.props;
    const { inputEmail } = this.state;
    getEmail(inputEmail);
    history.push('/carteira');
  }

  render() {
    const { inputEmail, inputPassword } = this.state;
    return (
      <section>
        <label htmlFor="email-input">
          Email:
          <input
            type="email"
            name="inputEmail"
            id="email-input"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ inputEmail }
          />
        </label>
        <label htmlFor="password-input">
          Password:
          <input
            type="password"
            name="inputPassword"
            id="password-input"
            data-testid="password-input"
            value={ inputPassword }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ !this.ableButton() }
          onClick={ this.buttonFunc }
        >
          Entrar
        </button>
      </section>);
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  getEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getEmail: (state) => dispatch(saveEmail(state)),
});

export default connect(null, mapDispatchToProps)(Login);
