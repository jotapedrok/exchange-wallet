import React from 'react';
import WalletHeader from '../components/Wallet/WalletHeader';
import FormExpenditure from '../components/Wallet/FormExpenditure';
import ExpenditureTable from '../components/Wallet/ExpenditureTable';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <div>
          <WalletHeader />
          <FormExpenditure />
          <ExpenditureTable />
        </div>
      </main>
    );
  }
}

export default Wallet;
