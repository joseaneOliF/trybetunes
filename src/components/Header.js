import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../services/Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isLoading: false,

    };
  }

  componentDidMount() {
    this.getUserFunc();
  }

  getUserFunc = async () => {
    this.setState({ isLoading: false });
    const getUserVar = await getUser();
    this.setState({
      isLoading: true,
      name: getUserVar,
    });
  };

  render() {
    const { isLoading, name } = this.state;
    return (
      <div>
        { isLoading
          ? (
            <header data-testid="header-component">
              <nav>
                <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
                <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
                <Link to="/profile" data-testid="link-to-profile">Meu Perfil</Link>
              </nav>
              <p data-testid="header-user-name">
                { name.name }
              </p>
            </header>
          ) : <Loading />}

      </div>
    );
  }
}

export default Header;
