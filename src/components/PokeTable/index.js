import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPokemons, fetchPokemonType, searchPokemon, BASE_URL } from '../../actions';
import './style.css';

class PokeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: this.props.pokemonsData.pokemons,
    };
    this.renderPokemonRows = this.renderPokemonRows.bind(this);
    this.selectPokemonType = this.selectPokemonType.bind(this);
    this.Navigate = this.Navigate.bind(this);
    this.searchPokemon = this.searchPokemon.bind(this);
  }

  componentDidMount() {
    this.props.fetchPokemons(`${BASE_URL}/pokemon/?limit=10`);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pokemonsData !== nextProps.pokemonsData) {
      this.setState({
        pokemons: nextProps.pokemonsData.pokemons,
      });
    }
  }

  searchPokemon(event) {
    const input = document.getElementById('pokemon-search');
    const name = input.value;
    this.props.searchPokemon(name.toLowerCase());
    this.setState({
      pokemons: null,
    });
  }

  Navigate(event) {
    const { next, previous } = this.props.pokemonsData.pokemonsMeta;
    const selected = event.target.textContent.toLowerCase();
    switch (selected) {
      case 'next':
        this.props.fetchPokemons(next);
        break;
      case 'previous':
        this.props.fetchPokemons(previous);
        break;
      default:
        break;
    }
    this.setState({
      pokemons: null,
    });
  }

  selectPagination(event) {
    let url;
    const noOfPokemons = event.target.textContent;
    document.getElementById('pagination-button').innerHTML = noOfPokemons;
    switch (noOfPokemons) {
      case '10':
        url = `${BASE_URL}/pokemon/?limit=10`;
        this.props.fetchPokemons(url);
        break;
      case '20':
        url = `${BASE_URL}/pokemon/?limit=20`;
        this.props.fetchPokemons(url);
        break;
      case '30':
        url = `${BASE_URL}/pokemon/?limit=30`;
        this.props.fetchPokemons(url);
        break;
      case '40':
        url = `${BASE_URL}/pokemon/?limit=40`;
        this.props.fetchPokemons(url);
        break;
      case '50':
        url = `${BASE_URL}/pokemon/?limit=50`;
        this.props.fetchPokemons(url);
        break;
      default:
        break;
    }
    this.setState({
      pokemons: null,
    });
  }

  selectPokemonType(event) {
    const type = event.target.textContent;
    console.log(event);
    document.getElementById('dropdown-input').value = type;
    switch (type) {
      case 'Normal':
        this.props.fetchPokemonType(1);
        break;
      case 'Fighting':
        this.props.fetchPokemonType(2);
        break;
      case 'Flying':
        this.props.fetchPokemonType(3);
        break;
      case 'Poison':
        this.props.fetchPokemonType(4);
        break;
      case 'Ground':
        this.props.fetchPokemonType(5);
        break;
      case 'Rock':
        this.props.fetchPokemonType(6);
        break;
      case 'Bug':
        this.props.fetchPokemonType(7);
        break;
      case 'Ghost':
        this.props.fetchPokemonType(8);
        break;
      case 'Steel':
        this.props.fetchPokemonType(9);
        break;
      case 'Fire':
        this.props.fetchPokemonType(10);
        break;
      case 'Water':
        this.props.fetchPokemonType(11);
        break;
      case 'Grass':
        this.props.fetchPokemonType(12);
        break;
      case 'Electric':
        this.props.fetchPokemonType(13);
        break;
      case 'Psychic':
        this.props.fetchPokemonType(14);
        break;
      case 'Ice':
        this.props.fetchPokemonType(15);
        break;
      case 'Dragon':
        this.props.fetchPokemonType(16);
        break;
      case 'Dark':
        this.props.fetchPokemonType(17);
        break;
      case 'Fairy':
        this.props.fetchPokemonType(18);
        break;
      case 'Unknown':
        this.props.fetchPokemonType(19);
        break;
      case 'Shadow':
        this.props.fetchPokemonType(20);
        break;
      default:
        break;
    }
    this.setState({ pokemons: null });
  }

  renderLoading() {
    return (
      <div className="overlay">
        <img src="/images/pokeball.svg" alt="img" />
        <p>
          Getting your pokemons out of the pokeballs.
        </p>
        <p>
          It might take some time
        </p>
      </div>
    );
  }

  renderPokemonRows() {
    const { pokemons } = this.state;
    console.log(pokemons);
    return pokemons.map(({
      name, sprites, types, height, weight,
    }) => (
      <tr key={name}>
        <td>{name}</td>
        <td><img src={sprites.front_default} alt="img" /></td>
        <td>{types.map(({ type }) => (<div>{`${type.name} `}</div>))}</td>
        <td><div>{`height: ${height / 10}m`}</div><div>{`weight: ${weight / 10}kg`}</div></td>
      </tr>
    ));
  }


  render() {
    if (!this.state.pokemons) { return <div>{this.renderLoading()}</div>; }
    return (
      <div>
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-md-1 col-sm-12">
              <div className="btn-group">
                <button id="pagination-button" type="button" className="btn btn-info dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Pokemons per page
                </button>
                <div className="dropdown-menu pagination-dropdown dropdown-menu-right">
                  <a className="dropdown-item" href="#" onClick={event => this.selectPagination(event)} >10</a>
                  <a className="dropdown-item" href="#" onClick={event => this.selectPagination(event)} >20</a>
                  <a className="dropdown-item" href="#" onClick={event => this.selectPagination(event)} >30</a>
                  <a className="dropdown-item" href="#" onClick={event => this.selectPagination(event)} >40</a>
                  <a className="dropdown-item" href="#" onClick={event => this.selectPagination(event)} >50</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-3 col-sm-12">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  aria-label="Text input with dropdown button"
                  placeholder="Type Category"
                  id="dropdown-input"
                />
                <div className="input-group-btn">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Types
                  </button>
                  <div className="dropdown-menu dropdown-menu-right scrollable-dropdown">
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Normal</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Fighting</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Flying</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Poison</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Ground</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Rock</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Bug</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Ghost</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Steel</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Fire</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Water</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Grass</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Electric</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Psychic</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Ice</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Dragon</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Dark</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Fairy</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Unknown</a>
                    <a className="dropdown-item" href="#" onClick={event => this.selectPokemonType(event)} >Shadow</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="input-group">
                <input
                  type="text"
                  id="pokemon-search"
                  className="form-control"
                  placeholder="Search a Pokemon"
                  aria-label="Search"
                />
                <span className="input-group-btn">
                  <button className="btn btn-secondary" type="button" onClick={event => this.searchPokemon(event)} >Search</button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Avatar</th>
                  <th>Type</th>
                  <th>Attributes</th>
                </tr>
              </thead>
              <tbody>
                {this.renderPokemonRows()}
              </tbody>
            </table>
          </div>
          <div className="row justify-content-around">
            <div className="col-sm-auto">
              <a href="#" className="nav-link" onClick={event => this.Navigate(event)} >Previous</a>
            </div>
            <div className="col-sm-auto" >
              <a href="#" className="nav-link" onClick={event => this.Navigate(event)} >Next</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPokemonType, fetchPokemons, searchPokemon }, dispatch);
}

function mapStateToProps({ pokemonsData }) {
  return { pokemonsData };
}

export default connect(mapStateToProps, mapDispatchToProps)(PokeTable);
