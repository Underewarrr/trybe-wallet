import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionSaveUser } from '../actions/index';
import './styles/login.css';
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const lengthMax = 6;
    this.setState({ [target.name]: target.value }, () => {
      const { email, password } = this.state;
      if (this.validateEmail(email) === true && password.length >= lengthMax) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
} // https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript/48800#48800

render() {
  const { email, password, isDisabled } = this.state;
  const { getEmail } = this.props;
  return (
    <div class="login-box"> 
      <h2>Login</h2>
      <form>
        <div class="user-box">
          <label htmlFor="email">
            Email:
            <input
              type="email"
              data-testid="email-input"
              name="email"
              placeholder="Email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          </div>
          <div class="user-box">
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              data-testid="password-input"
              placeholder="Senha"
              name="password"
              id="password"
              onChange={ this.handleChange }
              value={ password }
            />
          </label>
        </div>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ () => getEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </form>
    </div>
  );
}
}

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(actionSaveUser(email)),
});

Login.propTypes = {
  getEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
