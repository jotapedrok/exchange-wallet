import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpenditure, startEditing } from '../../actions';
import Button from './Button';
import TableHead from './TableHead';

class ExpenditureTable extends Component {
  constructor(props) {
    super(props);

    this.deleteButton = this.deleteButton.bind(this);
    this.editButton = this.editButton.bind(this);
  }

  editButton(e) {
    e.preventDefault();
    const { expenses, clickEdit } = this.props;
    const { target } = e;
    const line = target.parentNode.parentNode;
    const num = line.className;
    const editObj = expenses.find((expense) => expense.id === Number(num));
    clickEdit({ ...editObj });
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
    const { expenses, isEditing } = this.props;
    return (
      <table>
        <thead>
          <TableHead />
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
                    { !isEditing && <Button
                      clickFunc={ this.editButton }
                      testId="edit-btn"
                      text="Editar"
                    /> }
                    <Button
                      clickFunc={ this.deleteButton }
                      testId="delete-btn"
                      text="Excluir"
                    />
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
  isEditing: state.wallet.isEditing,
});

const mapDipatchToProps = (dispatch) => ({
  removeOneExpenditure: (payload) => dispatch(removeExpenditure(payload)),
  clickEdit: (payload) => dispatch(startEditing(payload)),
});

ExpenditureTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  removeOneExpenditure: PropTypes.func.isRequired,
  clickEdit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
};

ExpenditureTable.defaultProps = {
  isEditing: false,
};

export default connect(mapStateToProps, mapDipatchToProps)(ExpenditureTable);
