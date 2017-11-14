import axios from 'axios';

export const BASE_URL = 'https://pokeapi.co/api/v2';

export const FETCH_POKEMONS = 'FETCH_POKEMONS';
export const FETCH_POKEMON_TYPE = 'FETCH_POKEMON_TYPE';
export const SEARCH_POKEMON = 'SEARCH_POKEMON';

export function fetchPokemons(url) {
  const axiosGet = axios.get(url);
  const promisefetchdetails = axiosGet
    .then(({ data }) => {
      const promiseArray = data.results.map(({ url }) => {
        const promise = axios.get(url);
        return promise;
      });
      return axios.all(promiseArray);
    })
    .catch((err) => {
      console.error('Error while fetching:', err);
    });
  const meta = axiosGet.then(({ data }) => ({ next: data.next, previous: data.previous }));
  return {
    type: FETCH_POKEMONS,
    payload: Promise.all([meta, promisefetchdetails]),
  };
}

export function fetchPokemonType(typeId) {
  const url = `${BASE_URL}/type/${typeId}/`;
  const fetchPokemonsTypePromise = axios.get(url)
    .then(({ data }) => {
      const promiseArray = data.pokemon.map(({ pokemon }) => axios.get(pokemon.url));
      return axios.all(promiseArray);
    })
    .catch((err) => {
      console.error('Error while fetching:', err);
    });
  return {
    type: FETCH_POKEMON_TYPE,
    payload: fetchPokemonsTypePromise,
  };
}

export function searchPokemon(name) {
  const url = `${BASE_URL}/pokemon/${name}/`;
  const searchPokemonPromise = axios.get(url);
  return {
    type: SEARCH_POKEMON,
    payload: searchPokemonPromise,
  };
}
