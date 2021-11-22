import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, getCurrentCurr } from '../../actions';

class FormExpenditure extends Component {
  constructor(props) {
    super(props);

    const INITIAL_STATE = {
      value: '',
      description: '',
      currency: ' ',
      method: ' ',
      tag: ' ',
      id: 0,
    };

    this.state = INITIAL_STATE;

    this.inputRender = this.inputRender.bind(this);
    this.addButton = this.addButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectRender = this.selectRender.bind(this);
    this.optionsReturn = this.optionsReturn.bind(this);
  }

  componentDidMount() {
    const { saveCurrencies } = this.props;
    saveCurrencies();
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
      return ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
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
          {array.map((e, i) => <option data-testid={ e } key={ i }>{e}</option>)}
        </select>
      </label>
    );
  }

  addButton(e) {
    const { id } = this.state;
    const RETURN_STATE = {
      value: '',
      description: '',
      currency: '',
      method: ' ',
      tag: ' ',
      id: Number([id]) + 1,
    };
    const { saveExpenditure } = this.props;
    e.preventDefault();
    saveExpenditure(this.state);
    this.setState(RETURN_STATE);
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
            onClick={ this.addButton }
          >
            Adicionar despesa
          </button>
        </form>
      </section>
    );
  }
}

const mapDipatchToProps = (dispatch) => ({
  saveExpenditure: (payload) => dispatch(getCurrentCurr(payload)),
  saveCurrencies: () => dispatch(getCurrencies()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

FormExpenditure.propTypes = {
  saveExpenditure: PropTypes.func.isRequired,
  saveCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDipatchToProps)(FormExpenditure);
