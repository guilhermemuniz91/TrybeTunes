import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    loading: true,
    musicsApiResponse: [],
    musicList: [],
  };

  componentDidMount() {
    this.getAlbum();
  }

  getAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsApiResponse = await getMusics(id);
    const musicList = [...musicsApiResponse];
    musicList.shift(); // Remove o primeiro elemento do array que são as informações do album e eu só quero as músicas
    this.setState({
      loading: false,
      musicsApiResponse,
      musicList,
    });
  };

  render() {
    const { loading, musicsApiResponse, musicList } = this.state;
    if (loading) {
      return <Loading />;
    }
    const { collectionName, artistName } = musicsApiResponse[0];
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="album-name">{collectionName}</h2>
          <p data-testid="artist-name">{artistName}</p>
        </div>
        <section>
          {musicList.map((music, index) => (
            <MusicCard
              key={ index }
              musicList={ musicList }
              trackName={ music.trackName }
              trackId={ music.trackId }
              previewUrl={ music.previewUrl }
            />
          ))}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
