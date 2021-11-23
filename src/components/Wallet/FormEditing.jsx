import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { endEditing } from '../../actions';

const ALIMENTAÇÃO = 'Alimentação';

class FormEditing extends Component {
  constructor(props) {
    super(props);

    const { value, description, currency, method, tag, id } = props.editing;
    const INITIAL_STATE = {
      value,
      description,
      currency,
      method,
      tag,
      id,
    };
    this.state = INITIAL_STATE;

    this.handleChange = this.handleChange.bind(this);
    this.selectRender = this.selectRender.bind(this);
    this.optionsReturn = this.optionsReturn.bind(this);
    this.inputRender = this.inputRender.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  inputRender(type, id, name, text) {
    const { state } = this;
    const value = state[name];

    return (
      <label htmlFor={ id }>
        {text}
        <input
          type={ type }
          id={ id }
          data-testid={ id }
          name={ name }
          onChange={ this.handleChange }
          value={ value }
        />
      </label>
    );
  }

  optionsReturn(type) {
    const { currencies } = this.props;
    if (type === 'method') {
      return ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    }
    if (type === 'tag') {
      return [ALIMENTAÇÃO, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    }
    if (type === 'currency' && currencies) {
      return [...currencies];
    }
    return ['error', 'notFound'];
  }

  selectRender(id, text, name, value) {
    const array = this.optionsReturn(name);
    return (
      <label htmlFor={ id }>
        { text }
        <select
          id={ id }
          data-testid={ id }
          name={ name }
          onChange={ this.handleChange }
          value={ value }
        >
          {array.map((e, i) => <option key={ i }>{e}</option>)}
        </select>
      </label>
    );
  }

  saveChanges(e) {
    e.preventDefault();
    const { value, description, currency, method, tag, id } = this.state;
    const { expenses, finish } = this.props;
    const newExpenses = [...expenses];
    const editingObj = newExpenses.find((expense) => expense.id === id);
    editingObj.value = value;
    editingObj.description = description;
    editingObj.currency = currency;
    editingObj.method = method;
    editingObj.tag = tag;
    finish(newExpenses);
  }

  render() {
    const { metodo, categoria, moeda } = this.state;
    return (
      <section>
        <form>
          {this.inputRender('text', 'value-input', 'value', 'Valor:')}
          {this.inputRender('text', 'description-input', 'description', 'Descrição:')}
          {this.selectRender('currency-input', 'Moeda:', 'currency', moeda)}
          {this.selectRender('method-input', 'Método de pagamento:', 'method', metodo)}
          {this.selectRender('tag-input', 'Categoria:', 'tag', categoria)}
          <button
            type="button"
            onClick={ this.saveChanges }
          >
            Editar despesa
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
  editing: state.wallet.editing,
});

const mapDispatchToProps = (dispatch) => ({
  finish: (payload) => dispatch(endEditing(payload)),
});

FormEditing.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editing: PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  finish: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormEditing);
