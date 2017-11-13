import axios from 'axios';

const BASE_URL = ' http://pokeapi.salestock.net/api/v2';

export const FETCH_POKEMONS = 'FETCH_POKEMONS';
export const FETCH_POKEMON_TYPE = 'FETCH_POKEMON_TYPE';

export function fetchPokemons(noOfPokemons) {
  const url = `${BASE_URL}/pokemon/?limit=${noOfPokemons}`;
  const promisefetchdetails = axios.get(url)
    .then((req) => {
      const promiseArray = req.data.results.map(({ url }) => {
        const promise = axios.get(url);
        return promise;
      });
      return axios.all(promiseArray);
    });
  return {
    type: FETCH_POKEMONS,
    payload: promisefetchdetails,
  };
}

export function fetchPokemonType(typeId) {
  const url = `${BASE_URL}/type/${typeId}/`;
  const fetchPokemonsTypePromise = axios.get(url)
    .then(({ data }) => {
      const promiseArray = data.pokemon.map(({ pokemon }) => {
        return axios.get(pokemon.url);
      });
      return axios.all(promiseArray);
    });
  return {
    type: FETCH_POKEMON_TYPE,
    payload: fetchPokemonsTypePromise,
  };
}
