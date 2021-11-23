import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpenditure } from '../../actions';

class ExpenditureTable extends Component {
  constructor(props) {
    super(props);

    this.deleteButton = this.deleteButton.bind(this);
  }

  deleteButton(e) {
    e.preventDefault();
    const { expenses, removeOneExpenditure } = this.props;
    const { target } = e;
    const line = target.parentNode.parentNode;
    const num = line.className;
    const newExpenses = expenses.filter((expense) => expense.id !== Number(num));
    removeOneExpenditure(newExpenses);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Valor convertido</th>
            <th>Descrição</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor</th>
            <th>Moeda de conversão</th>
            <th>Método de pagamento</th>
            <th>Tag</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses !== [] && expenses.map((e) => {
            if (e.exchangeRates[e.currency]) {
              return (
                <tr className={ e.id } key={ e.id }>
                  <td>{(e.value * e.exchangeRates[e.currency].ask).toFixed(2)}</td>
                  <td>{e.description}</td>
                  <td>{e.exchangeRates[e.currency].name}</td>
                  <td>{Number(e.exchangeRates[e.currency].ask).toFixed(2)}</td>
                  <td>{e.value}</td>
                  <td>Real</td>
                  <td>{e.method}</td>
                  <td>{e.tag}</td>
                  <th>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ this.deleteButton }
                    >
                      Excluir
                    </button>
                  </th>
                </tr>
              );
            }
            return ('');
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDipatchToProps = (dispatch) => ({
  removeOneExpenditure: (payload) => dispatch(removeExpenditure(payload)),
});

ExpenditureTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  removeOneExpenditure: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDipatchToProps)(ExpenditureTable);
