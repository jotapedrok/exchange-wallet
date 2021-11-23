import React, { Component } from 'react';

export default class TableHead extends Component {
  render() {
    return (
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
    );
  }
}
