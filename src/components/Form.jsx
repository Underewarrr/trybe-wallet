import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchExpenses } from '../actions';
import Table from './Table';
import './styles/form.css'

const food = 'Alimentação';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: food,
      description: '',
      id: 0,
    };
  }

  componentDidMount() {
    const { currenciesFetch } = this.props;
    currenciesFetch();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleButton = () => {
    const { expensesFunc } = this.props;
    const { id } = this.state;
    expensesFunc(this.state);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: food,
    });
    this.setState(() => ({
      id: id + 1,
    }));
  }

  render() {
    const { currencies } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <form class="form_flex">
        <label 
         class="form_label"
         htmlFor="value-input">
          Valor:
          <input
            class="form_input"
            id="value-input"
            type="number"
            name="value"
            data-testid="value-input"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label 
         class="form_label"
         htmlFor="description-input">
          Descrição:
          <input
            class="form_input"
            id="description-input"
            type="text"
            name="description"
            data-testid="description-input"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        <label 
        class="form_label"
        htmlFor="Moeda">
          Moeda:
          <select
            class="form_select"
            id="Moeda"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            {currencies.map(
              (curr, index) => <option key={ index }>{ curr }</option>,
            )}
          </select>
        </label>
        <label 
        class="form_label"
        htmlFor="paymentMethod">
          Método de Pagamento:
          <select
            class="form_select"
            id="paymentMethod"
            type="select"
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label 
         class="form_label"
        htmlFor="tag-input">
          Tag:
          <select
            class="form_select"
            id="tag-input"
            type="select"
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button 
        class="form_button"
        type="button" onClick={ this.handleButton }>
          Adicionar despesa
        </button>
        <Table />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesFetch: () => dispatch(fetchCurrencies()),
  expensesFunc: (expense) => dispatch(fetchExpenses(expense)),
});

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expensesFunc: PropTypes.func.isRequired,
  currenciesFetch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
