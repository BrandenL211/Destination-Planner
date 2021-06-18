// Setup empty JS object to act as endpoint for all routes
let projectData = {};

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv')

dotenv.config();

// Start up an instance of app
const app = express();

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
const WEATHER_BIT_API = process.env.WEATHER_BIT_API;
const PIXABAY_API = process.env.PIXABAY_API;

// Setup Server
const port = 8000;

const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
};

app.get('/key_data', (req, res) => {
    res.send({
        GEONAMES_USERNAME: GEONAMES_USERNAME,
        WEATHER_BIT_API: WEATHER_BIT_API,
        PIXABAY_API: PIXABAY_API
    });
});

app.post('/addWeather', addWeather);

function addWeather(req, res) {
  
    newEntry = {
        temps: req.body.temps,
        date: req.body.date,
        feelings: req.body.feelings
    }
   
    projectData = newEntry;
    res.send(projectData);
    console.log(projectData);
}

app.get('/all', getData);

function getData(req, res) {
    res.send(projectData);
    console.log(projectData);
}

module.exports = {
    app
}