import React, { Component } from 'react';
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
            <header
              data-testid="header-component"
            >
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
