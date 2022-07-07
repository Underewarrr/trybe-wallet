import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles/table.css'

class Table extends Component {
  namesCurr = (obj) => {
    const element = Object.entries(obj.exchangeRates)
      .find((currency) => currency[0] === obj.currency);
    return element[1].name;
  }

  askCurr = (obj) => {
    const element = Object.entries(obj.exchangeRates)
      .find((currency) => currency[0] === obj.currency);
    const askValue = Number(element[1].ask).toFixed(2);
    return askValue;
  }

  totalValue = (obj) => {
    const { value } = obj;
    const element = Object.entries(obj.exchangeRates)
      .find((currency) => currency[0] === obj.currency);
    const convert = element[1].ask;
    return Number((value) * convert).toFixed(2);
  }

  render() {
    const { expenses } = this.props;
    return (
      <section class="section">
        <table class="section__table">
          <thead class="section__thead__style">
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody class="section__tbody__style">
            {expenses.map((obj, i) => (
              <tr key={ i }>
                <td>{obj.description}</td>
                <td>{obj.tag}</td>
                <td>{obj.method}</td>
                <td>{Number(obj.value).toFixed(2)}</td>
                <td>{this.askCurr(obj)}</td>
                <td>{this.namesCurr(obj)}</td>
                <td>{this.totalValue(obj)}</td>
                <td>Real</td>
                <td>Editar/Excluir</td>
              </tr>
            ))}

          </tbody>
        </table>
      </section>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
