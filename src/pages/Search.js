import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchArtist: '',
      isDisabled: true,
      findAlbums: [],
      findArtistAlbum: true,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.findArtistButton();
  }

  findArtistButton = async () => {
    const { searchArtist } = this.state;
    const getAlbums = await searchAlbumsAPI(searchArtist); // O estado atual de searchArtist é armazenada na const getAlbums.
    this.setState({
      findAlbums: getAlbums, // O retorno da API é armazenado em findAlbums
      findArtist: searchArtist, // Como o requisito pede para apagar o input, é necessário que o artista pesquisado seja armazenada em algum lugar.
      searchArtist: '', // Input apagado, após ter sido armazenado.
      isLoading: false, // isLoading é falso pq ja retornou a API
    }, this.validateInput());
  };

  validateInput = () => {
    const { findAlbums } = this.state;
    if (findAlbums.length === 0) { // Checa a existência ou não do album.
      this.setState({ findArtistAlbum: false });
    } else {
      this.setState({ findArtistAlbum: true });
    }
  };

  getAlbumCard = () => {
    const {
      findAlbums,
      findArtist,
    } = this.state;

    const albumCard = (
      <div>
        <p>
          Resultado de álbuns de:
          {' '}
          {findArtist}
        </p>
        {
          findAlbums.map((albumInfo, key) => (
            <div key={ key }>
              <img
                src={ albumInfo.artworkUrl100 }
                alt={ albumInfo.collectionName }
              />
              <ul>
                {/* <li>{albumInfo.artistId}</li> */}
                <li>{albumInfo.artistName}</li>
                {/* <li>{albumInfo.collectionId}</li> */}
                <li>{albumInfo.collectionName}</li>
                {/* <li>{albumInfo.releaseDate}</li> */}
                <li>{albumInfo.trackCount}</li>
                <Link
                  to={ `/album/${albumInfo.collectionId}` }
                  data-testid={ `link-to-album-${albumInfo.collectionId}` }
                />
              </ul>

            </div>
          ))
        }
      </div>);
    return albumCard;
  };

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
    const { searchArtist, isDisabled, isLoading, findArtistAlbum } = this.state;

    return (
      <div data-testid="page-search">
        <p>Search</p>
        <Header />

        <div>
          {
            isLoading ? <isLoading />
              : this.getAlbumCard()
          }
        </div>

        <div>
          {
            !findArtistAlbum && <p>Nenhum álbum foi encontrado</p>
          }
        </div>

        {/* <div data-testid="page-search"> */}
        {/* Pesquisar */}
        {/* </div> */}

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
            onClick={ this.findArtistButton }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

// Gratidão aos amigos Sérgio Moreira, João Kraemer e Aimê Martins. Sem vcs eu não teria conseguido.
//
