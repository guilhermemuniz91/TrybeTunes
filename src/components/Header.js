import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userName: '',
  };

  componentDidMount() {
    this.userNameFunction();
  }

  userNameFunction = async () => {
    const response = await getUser();
    this.setState({
      userName: response.name,
    });
  };

  render() {
    const { userName } = this.state;
    if (userName === '') return (<Loading />);
    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">{ userName }</h1>
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Musicas Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
