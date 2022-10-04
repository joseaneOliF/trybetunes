import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isDisable: true,

    };
  }

  handleChange = (e) => {
    const artistName = e.target.value;
    const minCaracter = 2;
    this.setState({ isDisable: (artistName.length < minCaracter) });
  };

  render() {
    const { name, isDisable } = this.state;

    return (
      <div data-testid="page-search">
        <p>Search</p>
        <Header />
        <label htmlFor="name" placeholder="Nome do artista">
          <input
            type="text"
            data-testid="search-artist-input"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ isDisable }
          data-testid="search-artist-button"
          // onClick={ this.savingUser }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
