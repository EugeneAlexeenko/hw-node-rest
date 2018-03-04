const express = require('express');
const axios = require('axios');
const app = express();

const port = 3000;
const pokeApi = `https://pokeapi.co/api/v2`;

let pokemons;

let dummyPokemons = [
 {
   id: 0,
   name: 'pikachu'
 },
 {
   id: 1,
   name: 'cheburashka'
 }
];

// get pokemons
axios.get(`${pokeApi}/pokemon`)
  .then(response => {
    pokemons = response.data;
    console.log(`pokemons received`);
  })
  .catch(e => {
    console.log(e);
  })

// Router
app.get('/', (req, res) => {
  res.send(pokemons);
});

app.get(`${pokeApi}/pokemon/:id`, (req, res) => {
  res.send(req.params);
});

app.listen(port, (err) => {
  if (err) {
    return console.log('error', err);
  }

  console.log(`App listening on port ${port}`);
});
