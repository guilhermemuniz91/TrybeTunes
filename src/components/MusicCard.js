import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    isChecked: false,
  };

  toogleFavorite = async ({ target: { checked } }) => {
    const { musicList, trackId } = this.props;
    const favoriteSong = musicList.find((music) => music.trackId === trackId); // Encontra a música que foi clicada
    this.setState({
      loading: true,
    });
    if (checked) {
      await addSong(favoriteSong);
      this.setState({
        loading: false,
        isChecked: true,
      });
    }
  };

  render() {
    const { trackName, trackId, previewUrl } = this.props;
    const { isChecked, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <>
        <main className="song-box">
          <h1>{trackName}</h1>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ `favorite${trackId}` }>
            Favorita
            <input
              type="checkbox"
              id={ `favorite${trackId}` } // Não sei se é necessário
              onChange={ this.toogleFavorite }
              checked={ isChecked }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </main>
        <hr />
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musicList: PropTypes.PropTypes.shape().isRequired,
};

export default MusicCard;
