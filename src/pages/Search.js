import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchArtist: '',
      isDisabled: true,
    };
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    return this.setState({
      [name]: value,
    }, () => this.validateButton());
  };

  validateButton = () => {
    const { searchArtist } = this.state;
    const two = 2;
    if (searchArtist.length >= two) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  render() {
    const { searchArtist, isDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <p>Search</p>
        <Header />
        <form>
          <input
            id="searchArtist"
            name="searchArtist"
            value={ searchArtist }
            type="text"
            data-testid="search-artist-input"
            onChange={ this.onChange }
          />

          <button
            type="button"
            disabled={ isDisabled }
            data-testid="search-artist-button"
          //
          // onClick={ this.requestApi }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
