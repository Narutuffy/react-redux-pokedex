import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const FETCH_10_POKEMONS = 'FETCH_10_POKEMONS';

export function fetch10Pokemons() {
  const url = `${BASE_URL}/pokemon/?limit=10`;
  const promisefetchdetails = axios.get(url)
    .then((req) => {
      const promiseArray = req.data.results.map(({ url }) => {
        const promise = axios.get(url);
        return promise;
      });
      return axios.all(promiseArray);
    });

  // const promiseArray = axios.all(promisefetchdetails);
  return {
    type: 'FETCH_10_POKEMONS',
    payload: promisefetchdetails,
  };
}

// function fetchPokemonDetails(url) {
//   const promisefetchdetails = axios.get(url)
//     .then((req) => {
//       req.data.results.map(({ url }) => axios.get(url));
//     });
//   console.log(promisefetchdetails);
// }
