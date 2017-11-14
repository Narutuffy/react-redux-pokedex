import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import img from '../../images/Pokeball.svg';
import { fetchPokemons, fetchPokemonType, searchPokemon, BASE_URL } from '../../actions';
import './style.css';

class PokeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: this.props.pokemonsData.pokemons,
      pokemonName: '',
    };
    this.renderPokemonRows = this.renderPokemonRows.bind(this);
    this.selectPokemonType = this.selectPokemonType.bind(this);
    this.Navigate = this.Navigate.bind(this);
    this.searchPokemon = this.searchPokemon.bind(this);
    this.triggerLoading = this.triggerLoading.bind(this);
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

  triggerLoading() {
    this.setState({
      pokemons: null,
    });
  }

  searchPokemon(event) {
    event.preventDefault();
    this.props.searchPokemon(this.state.pokemonName);
    this.triggerLoading();
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
    this.triggerLoading();
  }

  selectPagination(event) {
    const noOfPokemons = event.target.dataset.id;
    document.getElementById('pagination-button').innerHTML = noOfPokemons;
    const url = `${BASE_URL}/pokemon/?limit=${noOfPokemons}`;
    this.props.fetchPokemons(url);
    this.triggerLoading();
  }

  selectPokemonType(event) {
    const type = event.target.textContent;
    const typeId = event.target.dataset.id;
    document.getElementById('dropdown-input').value = type;
    this.props.fetchPokemonType(typeId);
    this.triggerLoading();
  }

  renderLoading() {
    return (
      <div className="overlay">
        <img src={img} alt="img" />
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
    return pokemons.map(({
      name, sprites, types, height, weight,
    }) => (
      <tr key={name}>
        <td>{name}</td>
        <td><img src={sprites.front_default} alt="img" /></td>
        <td>{types.map(({ type }) => (<div key={type.name}>{`${type.name} `}</div>))}</td>
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
                <div role="select" className="dropdown-menu pagination-dropdown dropdown-menu-right" onClick={event => this.selectPagination(event)} >
                  <a className="dropdown-item" href="#" data-id={10} >10</a>
                  <a className="dropdown-item" href="#" data-id={20} >20</a>
                  <a className="dropdown-item" href="#" data-id={30} >30</a>
                  <a className="dropdown-item" href="#" data-id={40} >40</a>
                  <a className="dropdown-item" href="#" data-id={50} >50</a>
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
                  <div role="select" className="dropdown-menu dropdown-menu-right scrollable-dropdown" onClick={event => this.selectPokemonType(event)}>
                    <a className="dropdown-item" href="#" data-id={1} >Normal</a>
                    <a className="dropdown-item" href="#" data-id={2} >Fighting</a>
                    <a className="dropdown-item" href="#" data-id={3} >Flying</a>
                    <a className="dropdown-item" href="#" data-id={4} >Poison</a>
                    <a className="dropdown-item" href="#" data-id={5} >Ground</a>
                    <a className="dropdown-item" href="#" data-id={6} >Rock</a>
                    <a className="dropdown-item" href="#" data-id={7} >Bug</a>
                    <a className="dropdown-item" href="#" data-id={8} >Ghost</a>
                    <a className="dropdown-item" href="#" data-id={9} >Steel</a>
                    <a className="dropdown-item" href="#" data-id={10} >Fire</a>
                    <a className="dropdown-item" href="#" data-id={11} >Water</a>
                    <a className="dropdown-item" href="#" data-id={12} >Grass</a>
                    <a className="dropdown-item" href="#" data-id={13} >Electric</a>
                    <a className="dropdown-item" href="#" data-id={14} >Psychic</a>
                    <a className="dropdown-item" href="#" data-id={15} >Ice</a>
                    <a className="dropdown-item" href="#" data-id={16} >Dragon</a>
                    <a className="dropdown-item" href="#" data-id={17} >Dark</a>
                    <a className="dropdown-item" href="#" data-id={18} >Fairy</a>
                    <a className="dropdown-item" href="#" data-id={19} >Unknown</a>
                    <a className="dropdown-item" href="#" data-id={20} >Shadow</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <form onSubmit={this.searchPokemon} className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search a Pokemon"
                  aria-label="Search"
                  onChange={e => this.setState({ pokemonName: e.target.value })}
                  value={this.state.pokemonName}
                />
                <span className="input-group-btn">
                  <button className="btn btn-secondary" type="submit" >Search</button>
                </span>
              </form>
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
