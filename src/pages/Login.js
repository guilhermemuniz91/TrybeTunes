import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    nameInput: '',
    loading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { history } = this.props;
    const { nameInput } = this.state;
    this.setState({ loading: true });
    await createUser({ name: nameInput });
    this.setState({ loading: false });
    history.push('/search');
  };

  render() {
    const { nameInput, loading } = this.state;
    const minChar = 3;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="nameInput">
            Username
            <input
              data-testid="login-name-input"
              type="text"
              name="nameInput"
              id="nameInput"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ nameInput.length < minChar }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
