import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const {
      trackName,
      previewUrl,
    } = this.props;

    return ( // aqui se cria a lista de músicas
      <span>
        <p>
          { trackName }
          {' '}
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          { ' ' }
          <code>audio</code>

        </audio>
      </span>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
