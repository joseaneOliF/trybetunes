import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../services/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false, // armazena o estado de Carregando...
      saveFavorites: [], // array que armazena as músicas favoritas
      isCheckedFavorites: false, // armazena o estado do checkbox
    };
  }

  async componentDidMount() { /// 9
    const { musics } = this.props; //  prop validations para os itens de objeto acessados
    const favoriteList = await getFavoriteSongs();
    const someFavoriteList = favoriteList
      .some((music) => music.trackId === musics.trackId);
    if (someFavoriteList) this.setState({ isCheckedFavorites: someFavoriteList });
  }

  saveFavoritesSongs = async (event) => {
    const { musics } = this.props;
    const { saveFavorites } = this.state;
    const favoriteChecked = event.target.checked; // evento de click

    this.setState({
      isLoading: true,
      isCheckedFavorites: favoriteChecked,
    });
    const requestApiSongs = await addSong(musics);
    this.setState({
      isLoading: false,
      saveFavorites: [...saveFavorites, requestApiSongs], // Pega o estado anterior e acrescenta
    });
  };

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;

    const {
      isLoading,
      isCheckedFavorites,
    } = this.state;

    return ( // aqui se cria a lista de músicas
      <div>
        {
          isLoading ? <Loading />
            : (
              <label htmlFor="favoriteSongs">
                Favorita
                <input
                  id="favoriteSongs"
                  name={ trackId }
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  checked={ isCheckedFavorites }
                  onChange={ this.saveFavoritesSongs }
                />

                <span>
                  <p>{ trackName }</p>
                  <audio data-testid="audio-component" src={ previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
                </span>
              </label>
            )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.shape({ artistId: PropTypes.number, trackId: PropTypes.number }),
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
}.isRequired;

MusicCard.defaultProps = {
  musics: PropTypes.shape({ artistId: 0 }),
  trackName: '',
  previewUrl: '',
  trackId: 0,
};

export default MusicCard;
