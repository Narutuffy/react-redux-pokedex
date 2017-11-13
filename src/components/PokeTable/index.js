import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPokemons, fetchPokemonType } from '../../actions';
import './style.css';

class PokeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderPokemonRows = this.renderPokemonRows.bind(this);
    this.selectPokemonType = this.selectPokemonType.bind(this);
  }

  componentDidMount() {
    this.props.fetchPokemons(10);
  }

  selectPokemonType(event) {
    const type = event.target.textContent;
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
  }

  renderPokemonRows() {
    const { pokemons } = this.props;
    console.log(pokemons);
    return pokemons.map(({
      name, sprites, types, height, weight,
    }) => (
      <tr key={name}>
    <td>{name}</td>
    <td><img src={sprites.front_default} /></td>
    <td>{types.map(({ type }) => (<div>{`${type.name} `}</div>))}</td>
    <td><div>{`height: ${height / 10}m`}</div><div>{`weight: ${weight / 10}kg`}</div></td>
  </tr>
    ));
  }


  render() {
    if (this.props.pokemons.length === 0) { return <div>Loading...</div>; }
    return (
      <div>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-3">
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
            <div className="col-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search"
                />
                <span className="input-group-btn">
                  <button className="btn btn-secondary" type="button">Search</button>
                </span>
              </div>
            </div>
            <div className="col-2">
              <div className="btn-group">
                <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Pagination
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">10</a>
                  <a className="dropdown-item" href="#">20</a>
                  <a className="dropdown-item" href="#">30</a>
                  <a className="dropdown-item" href="#">40</a>
                  <a className="dropdown-item" href="#">50</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
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
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPokemonType, fetchPokemons }, dispatch);
}

function mapStateToProps({ pokemons }) {
  return { pokemons };
}

export default connect(mapStateToProps, mapDispatchToProps)(PokeTable);
