const BASE_URL = 'https://restcountries.com/v2/name/';

export default function fetchCountries(searchQuery) {
  return fetch(BASE_URL + `${searchQuery}`).then(response => {
    console.log(response);
    if (response.status === 404) {
      throw new Error('Така країна не знайдена.');
    }
    return response.json();
  });
}