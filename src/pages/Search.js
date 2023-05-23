import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    artistInput: '',
    loading: false,
    albumApiResponse: [],
    albumFound: '',
    albumNotFound: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  clearAndFetch = async () => {
    const { artistInput } = this.state;
    this.setState({ loading: true });
    const albumApiResponse = await searchAlbumsAPI(artistInput);
    this.setState({
      loading: false,
      artistInput: '', // limpa o input
      albumApiResponse, // atualiza o estado com o resultado da API
      albumFound: `Resultado de álbuns de: ${artistInput}`,
      albumNotFound: 'Nenhum álbum foi encontrado',
    });
  };

  render() {
    const {
      artistInput,
      loading,
      albumApiResponse,
      albumFound,
      albumNotFound,
    } = this.state;

    const minChar = 2;

    if (loading) {
      return <Loading />;
    }

    return (
      <main>
        <div data-testid="page-search">
          <Header />
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Digite o nome do artista"
            name="artistInput"
            value={ artistInput }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ artistInput.length < minChar }
            onClick={ this.clearAndFetch }
          >
            Pesquisar
          </button>
        </div>
        <section>
          <h1>
            {albumApiResponse.length === 0 ? albumNotFound : albumFound}
          </h1>
          <ul>
            {albumApiResponse.map((albumResponse) => (
              <li key={ albumResponse.collectionId }>
                <Link
                  data-testid={ `link-to-album-${albumResponse.collectionId}` }
                  to={ `/album/${albumResponse.collectionId}` }
                >
                  <img
                    src={ albumResponse.artworkUrl100 }
                    alt="imagem do albuns"
                  />
                  <p>{albumResponse.collectionName}</p>
                  <p>{albumResponse.artistName}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    );
  }
}

export default Search;
