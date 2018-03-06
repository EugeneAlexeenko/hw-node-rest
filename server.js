const config = require('./config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const passport = require('passport');
const axios = require('axios');
const mongoose = require('mongoose');

const DOG_API_URL = config.dogApiUrl; 
const MONGO_DB_PATH = config.mongoDbPath;
const PORT = config.port;

mongoose.connect(MONGO_DB_PATH); 
const Schema = mongoose.Schema;

const BreedSchema = new Schema({
  breed: String,
  imgUrl: String
});

const Breed = mongoose.model('breed', BreedSchema);

axios.get(`${DOG_API_URL}/breeds/list`)
  .then(response => {
    console.log(`dog brees received succesfully!`);
    let breedList = response.data.message;
    fillDB(breedList);
  })
  .catch(err => console.log(err));

function fillDB (breedList) {
  breedList.forEach(breed => {
    let data = new Breed({
      breed
    });  
    data.save();
  }); 
}

app.get('/', (req, res) => {
  res.send('hello from express');
});

// Login page
app.post('/login', (req, res) => {
  res.send('Welcome on login page');
});

// Get all breads collection
app.get('/breeds', (req, res) => {
  res.send(breeds.toString());
});

// Get image by breed
app.get('/breed/:id', (req, res) => {
  const breed = req.params.id;

  axios.get(`${DOG_API_URL}/breed/${breed}/images/random`)
    .then(response => {
      imgUrl = response.data.message;
      res.send(imgUrl);
    })
    .catch(err => console.log(err));
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log('error', err);
  }

  console.log(`App listening on port ${PORT}`);
});
