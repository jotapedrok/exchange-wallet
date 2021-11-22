import React from 'react';
import WalletHeader from '../components/Wallet/WalletHeader';
import FormExpenditure from '../components/Wallet/FormExpenditure';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <div>
          <WalletHeader />
          <FormExpenditure />
        </div>
      </main>
    );
  }
}

export default Wallet;
