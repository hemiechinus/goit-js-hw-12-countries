import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';
 import countryCardTpl from '../partials/country-card.hbs'; 
 import countryListTpl from '../partials/country-list.hbs';
import refs from './ref.js';
const { searchForm } = refs;

import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');

refs.searchForm.addEventListener('input', debounce(onSearch, 1000));


function onSearch(e) {
  e.preventDefault();
  let searchQuery = e.target.value;
  renderCountri();
  if (!searchQuery) return;

  fetchCountries(searchQuery)
    .then(data => {
      const dataLen = data.length;
      if (dataLen === 1) {
        const cardMarkup = countryCardTpl(data);
        renderCountri(cardMarkup);
        return;
      }
      if (dataLen <= 10) {
        const cardMarkup = countryListTpl(data);
        renderCountri(cardMarkup);
        return;
      }

      if (dataLen > 10) {
        error({
          text: 'Забагато знайдено. Будь-ласка, введіть більш точний запит!',
        });
        return;
      }
    })
    .catch(error => {
      error({
        text: error,
      });
    });
}


function renderCountri(markup = '') {
  refs.cardInfo.innerHTML = markup;
}

function clearInput() {
  refs.searchForm.value = '';
}