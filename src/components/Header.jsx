import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles/header.css'

const sum = 0;
class Header extends React.Component {
  render() {
    const { email, total } = this.props;
    return (
      <header class="header__field">
        <h3 class="enail__text__field"data-testid="email-field">{`Email: ${email}`}</h3>
        <h3 data-testid="total-field">{total.toFixed(2)}</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.expenses.reduce((item, curr) => {
    item += curr.value * Number(curr.exchangeRates[curr.currency].ask);
    return item;
  }, sum),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Header);
