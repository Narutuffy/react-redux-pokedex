import { FETCH_10_POKEMONS } from '../actions';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_10_POKEMONS:
      return action.payload.map(({ data }) => data );
    default:
      return state;
  }
}
