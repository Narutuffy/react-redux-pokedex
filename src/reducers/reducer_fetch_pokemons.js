import { FETCH_POKEMONS, FETCH_POKEMON_TYPE } from '../actions';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_POKEMONS:
      return action.payload.map(({ data }) => data);
    case FETCH_POKEMON_TYPE:
      return action.payload.map(({ data }) => data);
    default:
      return state;
  }
}
