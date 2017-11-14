import { FETCH_POKEMONS, FETCH_POKEMON_TYPE, SEARCH_POKEMON } from '../actions';

export default function (state = {}, action) {
  let pokemons;
  let pokemonsMeta;
  switch (action.type) {
    case FETCH_POKEMONS:
      pokemonsMeta = action.payload[0];
      pokemons = action.payload[1].map(({ data }) => data);
      return { pokemons, pokemonsMeta };
    case FETCH_POKEMON_TYPE:
      pokemons = action.payload.map(({ data }) => data);
      return { pokemons };
    case SEARCH_POKEMON:
      pokemons = [action.payload.data];
      return { pokemons };
    default:
      return state;
  }
}
