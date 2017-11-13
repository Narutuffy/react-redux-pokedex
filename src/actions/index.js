import axios from 'axios';

const BASE_URL = ' http://pokeapi.salestock.net/api/v2';

export const FETCH_POKEMONS = 'FETCH_POKEMONS';
export const FETCH_POKEMON_TYPE = 'FETCH_POKEMON_TYPE';
export const FETCH_POKEMONS_META = 'FETCH_POKEMONS_META';

export function fetchPokemons(noOfPokemons) {
  const url = `${BASE_URL}/pokemon/?limit=${noOfPokemons}`;
  const axiosGet = axios.get(url);
  const promisefetchdetails = axiosGet
    .then(({ data }) => {
      const promiseArray = data.results.map(({ url }) => {
        const promise = axios.get(url);
        return promise;
      });
      return axios.all(promiseArray);
    });
  const meta = axiosGet.then(({ data }) => ({ next: data.next, previous: data.previous }));
  return {
    type: FETCH_POKEMONS,
    payload: Promise.all([meta, promisefetchdetails]),
  };
}

export function fetchPokemonsMeta(payload) {
  return {
    type: FETCH_POKEMONS_META,
    payload,
  };
}

export function fetchPokemonType(typeId) {
  const url = `${BASE_URL}/type/${typeId}/`;
  const fetchPokemonsTypePromise = axios.get(url)
    .then(({ data }) => {
      const promiseArray = data.pokemon.map(({ pokemon }) => axios.get(pokemon.url));
      return axios.all(promiseArray);
    });
  return {
    type: FETCH_POKEMON_TYPE,
    payload: fetchPokemonsTypePromise,
  };
}
