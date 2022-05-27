import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getExchangeRates from '../services/api';
import { actionCreators } from '../redux/actions';

class ExpensesForm extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      id: 0,
      valueInput: '',
      currencyInput: 'USD',
      methodInput: 'Dinheiro',
      tagInput: 'Alimentação',
      descriptionInput: '',
      exchangeRates: {},
    };
  }

  async componentDidMount() {
    const exchangeRates = await getExchangeRates();
    const currencies = Object.keys(exchangeRates);

    this.setState({ currencies, exchangeRates });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  handleAddExpensesButton = () => {
    const {
      id,
      valueInput,
      currencyInput,
      methodInput,
      tagInput,
      descriptionInput,
      exchangeRates,
    } = this.state;
    const { addExpense } = this.props;

    addExpense({
      id,
      value: valueInput,
      currency: currencyInput,
      method: methodInput,
      tag: tagInput,
      description: descriptionInput,
      exchangeRates,
    });

    this.setState((prevState) => ({
      id: prevState.id + 1,
      valueInput: '',
      descriptionInput: '',
    }));
  }

  render() {
    const {
      currencies,
      valueInput,
      descriptionInput,
      currencyInput,
      // methodInput, desnecessauro.
      // tagInput,
    } = this.state;
    return (
      <form className="expenses-form">

        <label htmlFor="valueInput">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            onChange={ this.handleChange }
            value={ valueInput }
            name="valueInput"
          />
        </label>
        <label htmlFor="currency-input">
          Moeda
          <select
            id="currency-input"
            data-testid="currency-input"
            onChange={ this.handleChange }
            name="currencyInput"
            value={ currencyInput }
          >
            {currencies.map((currency, index) => (
              <option
                data-testid={ currency }
                key={ index }
                value={ currency }
              >
                {currency}
              </option>
            ))}
          </select>
        </label>
        <select
          data-testid="method-input"
          onChange={ this.handleChange }
          name="methodInput"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de débito">Cartão de débito</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
        </select>

        <select
          data-testid="tag-input"
          onChange={ this.handleChange }
          name="tagInput"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        <label htmlFor="descriptionInput">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            onChange={ this.handleChange }
            name="descriptionInput"
            value={ descriptionInput }

          />
        </label>
        <button
          type="button"
          onClick={ this.handleAddExpensesButton }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (payload) => dispatch(actionCreators.saveExpenses(payload)),
});

export default connect(null, mapDispatchToProps)(ExpensesForm);

ExpensesForm.propTypes = {
  addExpense: PropTypes.func.isRequired,
};
