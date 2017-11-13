import { FETCH_POKEMONS, FETCH_POKEMON_TYPE } from '../actions';

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
    default:
      return state;
  }
}
