import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
    };
  }

  componentDidMount() {
    this.getAlbumList();
  }

  getAlbumList = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const getMusicsAlbum = await getMusics(id);// requisita a api
    this.setState({
      musicList: getMusicsAlbum,
    });
  };

  render() {
    const { musicList } = this.state;
    return (
      <div data-testid="page-album">
        <p>Album</p>
        <Header />
        <div>
          {
            musicList.map((music, index) => (
              index === 0 ? ( // Se o index for 0 retorna informações do álbum e artista

                <div key={ index }>
                  <img
                    src={ music.artworkUrl100 }
                    alt={ music.collectionName }
                  />
                  <p data-testid="artist-name">{music.artistName}</p>
                  <p data-testid="album-name">{music.collectionName}</p>
                </div>

              )
                : ( // se o index não for 0 retorna a lista de músicas que foi criada em MusicCard
                  <div key={ music.trackId }>
                    <MusicCard
                      trackName={ music.trackName }
                      previewUrl={ music.previewUrl }
                    />
                  </div>
                )
            ))
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string,
}.isRequired;

export default Album;

// Requisito feito com a ajuda de Sérgio Moreira
