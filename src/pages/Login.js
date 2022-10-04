import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../services/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isDisable: true,
      isLoading: false,
      savingName: false,
    };
  }

  handleChange = (e) => {
    const nome = e.target.value;
    const minCaracter = 3;
    if (nome.length >= minCaracter) {
      this.setState({
        name: nome,
        isDisable: false,
      });
    }
    if (nome.length < minCaracter) {
      this.setState({
        name: nome,
        isDisable: true,
      });
    }
  };

  savingUser = async () => {
    const { name } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name });
    this.setState({
      savingName: true,
    });
  };

  render() {
    const { name, isDisable, isLoading, savingName } = this.state;
    return (
      <>
        {savingName && <Redirect to="/search" />}
        {isLoading ? <Loading />
          : (

            <div data-testid="page-login">
              <p>Login</p>
              <label htmlFor="name">
                Nome
                <input
                  type="text"
                  data-testid="login-name-input"
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="submit"
                disabled={ isDisable }
                data-testid="login-submit-button"
                onClick={ this.savingUser }
              >
                Entrar
              </button>
            </div>
          )}
      </>
    );
  }
}

export default Login;
