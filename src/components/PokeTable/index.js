import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { fetch10Pokemons } from '../../actions';
import './style.css';

class PokeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderPokemonRows = this.renderPokemonRows.bind(this);
  }

  componentDidMount() {
    this.props.fetch10Pokemons();
  }

  renderPokemonRows() {
    const { pokemons } = this.props;
    console.log(pokemons);
    return pokemons.map(({ name, sprites, types, height, weight }) => (
      <tr key={name}>
        <td>{name}</td>
        <td><img src={sprites.front_default} /></td>
        <td>{types.map(({type}) => (<div>{`${type.name} `}</div>))}</td>
        <td><div>{`height: ${height / 10}m`}</div><div>{`weight: ${weight / 10}kg`}</div></td>
      </tr>
    ));
  }

  render() {
    if (this.props.pokemons.length==0)
      return <div>Loading...</div>;
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
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#">Type1</a>
                    <a className="dropdown-item" href="#">Type2</a>
                    <a className="dropdown-item" href="#">Type3</a>
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
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                  <a className="dropdown-item" href="#">Separated link</a>
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
  return bindActionCreators({ fetch10Pokemons }, dispatch);
}

function mapStateToProps({ pokemons }) {
  return { pokemons };
}

export default connect(mapStateToProps, mapDispatchToProps)(PokeTable);
