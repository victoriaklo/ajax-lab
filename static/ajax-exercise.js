'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  fetch('/fortune')
    .then(response => response.text())
    .then(liveFortune => {
      document.querySelector('#fortune-text').innerHTML = liveFortune;
    });
}


document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();
  
  const inputZipcode = document.querySelector('#zipcode-field').value;
  const queryString = new URLSearchParams({zipcode: inputZipcode}).toString();
  const url = `/weather.json?${queryString}`;


  fetch(url)
    .then(response => response.json())
    .then(weatherForecast => {
    document.querySelector('#weather-info').innerText = weatherForecast.forecast;
  });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)

  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  };

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.code === 'ERROR') {
        document.querySelector('#order-status').classList.add('order-error');
      }
      document.querySelector('#order-status').innerText = responseJson.msg;
    });
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);


