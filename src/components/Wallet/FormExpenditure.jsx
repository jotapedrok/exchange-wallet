import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentCurr } from '../../actions';

class FormExpenditure extends Component {
  constructor(props) {
    super(props);

    const INITIAL_STATE = {
      valor: '',
      descrição: '',
      moeda: '',
      metodo: ' ',
      categoria: ' ',
      id: 0,
    };

    this.state = INITIAL_STATE;

    this.inputRender = this.inputRender.bind(this);
    this.addButton = this.addButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  addButton(e) {
    const { id } = this.state;
    const RETURN_STATE = {
      valor: '',
      descrição: '',
      moeda: '',
      metodo: ' ',
      categoria: ' ',
      id: Number([id]) + 1,
    };
    const { saveExpenditure } = this.props;
    e.preventDefault();
    saveExpenditure(this.state);
    this.setState(RETURN_STATE);
  }

  render() {
    const { metodo, categoria } = this.state;
    return (
      <section>
        <form>
          {this.inputRender('text', 'value-input', 'valor', 'Valor:')}
          {this.inputRender('text', 'description-input', 'descrição', 'Descrição:')}
          {this.inputRender('text', 'currency-input', 'moeda', 'Moeda:')}
          <label htmlFor="method-input">
            Método de pagamento:
            <select
              id="method-input"
              data-testid="method-input"
              name="metodo"
              onChange={ this.handleChange }
              value={ metodo }
            >
              <option> </option>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria:
            <select
              id="tag-input"
              data-testid="tag-input"
              name="categoria"
              onChange={ this.handleChange }
              value={ categoria }
            >
              <option> </option>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
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
});

FormExpenditure.propTypes = {
  saveExpenditure: PropTypes.func.isRequired,
};

export default connect(null, mapDipatchToProps)(FormExpenditure);
