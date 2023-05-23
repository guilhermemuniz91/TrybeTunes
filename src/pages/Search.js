import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    artistInput: '',
    loading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      artistInput,
      loading,
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
          >
            Pesquisar
          </button>
        </div>
      </main>
    );
  }
}

export default Search;
