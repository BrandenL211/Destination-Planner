import {updateUI} from './updateUI';

/* Global Variables */
const baseURL = 'http://api.geonames.org/searchJSON?q=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'/'+ d.getDate()+'/'+ d.getFullYear();
let date2 = new Date(newDate);

document.getElementById('generate').addEventListener('click', performAction);


function performAction(e) {

    e.preventDefault();

    fetch('http://localhost:8000/key_data')
        .then((res) => res.json())
        .then((keys) => {
            const GEONAMES_USERNAME = keys.GEONAMES_USERNAME;
            const PIXABAY_API = keys.PIXABAY_API;
            const WEATHER_BIT_API = keys.WEATHER_BIT_API;
        
    const apiKey = `&maxRows=1&username=${GEONAMES_USERNAME}`;
    const newCountry = document.getElementById('dest').value;
    const vacDate = document.getElementById('depDate').value;
    const date1 = new Date(vacDate);
    const diffInTime = date1.getTime() - date2.getTime();
    const feels = diffInTime / (1000 * 3600 * 24);


    getWeather(baseURL, newCountry, apiKey) 
  
    .then(function (data) {
        let lat = data.geonames[0].lat;
        let lng = data.geonames[0].lng;
        let place = data.geonames[0].name;

        weatherBitGet(lat, lng, place, feels, PIXABAY_API, WEATHER_BIT_API)
        
    })
  });
}

document.getElementById('spot').addEventListener('click', deleteTrip);

function deleteTrip(event) {
    if (event.target.className != 'card-btn') return;

    let theCard = event.target.closest('.grid-item');
    theCard.remove();
}


const postData = async ( url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

        try {
            const newData = await response.json();
            console.log(newData);
            return newData;
        } catch(error) {
            console.log("error", error);
        }
}

function weatherBitGet (lat, lng, place, feels, PIXABAY_API, WEATHER_BIT_API) {
    console.log(PIXABAY_API);
    console.log(WEATHER_BIT_API);
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${WEATHER_BIT_API}`)

    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let futureTemp = data.data[0].temp;

        pixaImage(place, futureTemp, feels, PIXABAY_API)

    });

    
}

function pixaImage (place, futureTemp, feels, PIXABAY_API) {
    fetch(`https://pixabay.com/api/?key=${PIXABAY_API}&q=${place}&orientation=horizontal&category=travel&per_page=3`)

    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        let img = data.hits[0].webformatURL;

        postData('http://localhost:8000/addWeather', {temps:futureTemp, date:img, feelings:feels})

        fetch('http://localhost:8000/all')
        .then((response) => response.json())
        .then((response) => updateUI(response));

        //updateUI()
    });

}

const getWeather = async (baseURL, country, key) => {
    const res = await fetch(baseURL+country+key)

    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

/*const updateUI = (res) => {
    const {temps, feelings, date} = res;

    const div1 = document.createElement("div");
    const div2 = document.createElement("div");

    div1.setAttribute("class", "grid-item");
    div2.setAttribute("class", "card-content");
    let results = document.createElement('h2');
    results.innerHTML = "Your Results:";
    let Temp = document.createElement('p');
    Temp.innerHTML = `Temperature: ${temps}`;
    let Feel = document.createElement('p');
    Feel.innerHTML = `Your trip is in: ${feelings} days`;
    let Pic = document.createElement('img');
    Pic.setAttribute("src", `${date}`);
    let butt = document.createElement('button');
    butt.setAttribute("class", "card-btn");
    butt.innerHTML = "Delete";
    sect.removeAttribute("hidden");

    div1.append(Pic);
    div2.append(results);
    div2.append(Temp);
    div2.append(Feel);
    div2.append(butt);
    sect.appendChild(div1);
    div1.appendChild(div2);
}*/

export {performAction, weatherBitGet, deleteTrip, pixaImage};