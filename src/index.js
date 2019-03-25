import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';


ReactDOM.render( < App / > ,
  document.getElementById('root'));


fetch('https://swapi.co/api/people/1/')
  .then((res) => {
    return res.json();
  })
  .then((body) => {
    console.log(body.starships);
  });