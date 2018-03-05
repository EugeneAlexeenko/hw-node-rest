const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');

const config = require('./config');

const DOG_API_URL = config.dogApiUrl; 
const MONGO_DB_PATH = config.mongoDbPath;
const PORT = config.port;

const app = express();

mongoose.connect(MONGO_DB_PATH); 
const Schema = mongoose.Schema;
const BreedDataSchema = new Schema({
  breed: String,
});

const BreedData = mongoose.model('breedData', BreedDataSchema);


axios.get(`${DOG_API_URL}/breeds/list`)
  .then(response => {
    console.log(`dog brees received succesfully!`);
    let breeds = response.data.message;
    fillDB(breeds);
  })
  .catch(err => console.log(err));

function fillDB (breeds) {
  breeds.forEach(breed => {
    let data = new BreedData({
      breed: breed
    });  
    data.save();
  }); 
}

// Router
app.get('/', (req, res) => {
  res.send('hello from express');
});

app.get('/breeds', (req, res) => {
  res.send(breeds.toString());
});

app.get('/breed/:id', (req, res) => {
  console.log(req.params.id);
  const breed = req.params.id;
  let image;

  axios.get(`${DOG_API_URL}/breed/${breed}/images/random`)
    .then(response => {
      console.log(`Breed ${breed} received!`);
      console.log(response.data.message);
      image = response.data.message;
      res.send(image);
    })
    .catch(err => console.log(err));
})

// app.get(`${pokeApi}/pokemon/:id`, (req, res) => {
//   res.send(req.params);
// });

app.listen(PORT, (err) => {
  if (err) {
    return console.log('error', err);
  }

  console.log(`App listening on port ${PORT}`);
});
