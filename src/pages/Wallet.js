import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletHeader from '../components/Wallet/WalletHeader';
import FormExpenditure from '../components/Wallet/FormExpenditure';
import ExpenditureTable from '../components/Wallet/ExpenditureTable';
import FormEditing from '../components/Wallet/FormEditing';

class Wallet extends React.Component {
  render() {
    const { isEditing } = this.props;
    return (
      <main>
        <div>
          <WalletHeader />
          {isEditing ? <FormEditing /> : <FormExpenditure />}
          <ExpenditureTable />
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  isEditing: state.wallet.isEditing,
});

Wallet.propTypes = {
  isEditing: PropTypes.bool,
};

Wallet.defaultProps = {
  isEditing: false,
};

export default connect(mapStateToProps)(Wallet);
