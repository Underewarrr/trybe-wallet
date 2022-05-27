import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  email: state.user.email,
  wallet: state.wallet,
});

class Header extends React.Component {
  render() {
    const { email, wallet: { expenses } } = this.props;
    return (
      <header>
        <div>
          TrybeWallet
        </div>
        <div>
          <span>E-mail: </span>
          <span data-testid="email-field">{ email }</span>
        </div>
        <div>
          <span>Despesa Total: R$ </span>
          <span data-testid="total-field">
            { expenses.reduce((acc, { exchangeRates, currency, value }) => (
              acc + (exchangeRates[currency].ask * value)
            ), 0) }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.object),
  }),
}.isRequired;
