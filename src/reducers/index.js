import { combineReducers } from 'redux';
import FetchPokemonReducers from './reducer_fetch_pokemons';

const rootReducer = combineReducers({
  pokemonsData: FetchPokemonReducers,
});

export default rootReducer;
