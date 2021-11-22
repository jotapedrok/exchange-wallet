import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletHeader extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        Email:
        <p
          data-testid="email-field"
        >
          { email }
        </p>
        <p
          data-testid="total-field"
        >
          {expenses}
        </p>
        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>
      </div>
    );
  }
}

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses.reduce((acc, curr) => {
    const { currency, value, exchangeRates } = curr;
    const cota = exchangeRates[currency].ask;
    const brl = Number(value) * Number(cota);
    return (acc + brl);
  }, 0),
});

export default connect(mapStateToProps)(WalletHeader);
