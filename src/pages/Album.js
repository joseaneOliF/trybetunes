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
        <section>
          {
            musicList.filter((element, index) => index === 0).map((music, index) => (
              <div key={ index }>
                <p data-testid="artist-name">{music.artistName}</p>
                <img
                  src={ music.artworkUrl100 }
                  alt={ music.collectionName }
                />
                <p data-testid="album-name">{music.collectionName}</p>
              </div>
            ))
          }
          <span>
            {
              musicList.filter((element, index) => index !== 0).map((music, index) => (
                <MusicCard
                  key={ index.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                />
              ))
            }
          </span>
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string,
}.isRequired;

export default Album;

// Requisito 7 feito com a ajuda de Sérgio Moreira
// Nunca que eu teria feito esse requisito 8 sem a ajuda de Sérgio!
