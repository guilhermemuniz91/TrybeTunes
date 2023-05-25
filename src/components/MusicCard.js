import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
  };

  render() {
    const { trackName, previewUrl } = this.props;
    const { loading } = this.state;
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
        </main>
        <hr />
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
