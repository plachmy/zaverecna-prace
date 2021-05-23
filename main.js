const apiKey = 'a110815915d06382713d71f482daceae'
const map = 'citiesMap'
const citiesMap = loadMap();
const currentResult = document.getElementById('cities')

renderFromMap();

function searchCityByName() {
    const inputCity = document.getElementById('inputCity');
    let foundedCityFromApi = inputCity.value;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${foundedCityFromApi}&units=metric&appid=${apiKey}&lang=cz`).then(response => {
        if (!response.ok) {
            throw Error(`${response.status} ${response.statusText}`);
        }
        return response.json()
    })
        .then ( json => {
            console.log(json);
            let weather = json.weather[0];
            let main = json.main;

            let element = ` 
         <div style="border-top: 1px solid white; margin-left: 70vh; margin-right: 70vh">
            <img src="${weatherIcon(weather.icon)}" style="text-align: center">
            <h1 style="font-size: 4vh">${foundedCityFromApi}</h1>
            <p>${weather.description}</p>
            <p id="bot" style="padding-bottom: 2.5vh">${Math.round(main.temp)}°C</p>
         </div>
         `
            citiesMap.set(foundedCityFromApi, element);
            localStorage.setItem(map, JSON.stringify(Array.from(citiesMap.entries())));

            renderFromMap();

        });
    const sectionTwo = document.querySelector('.sectionTwo')
    window.scrollTo({top: sectionTwo.scrollHeight, behavior: 'smooth'});

}

function renderFromMap() {
    currentResult.innerHTML = '';
    citiesMap.forEach( (value, key, map) => {
        let ele = document.createElement('div');
        ele.innerHTML = value;
        currentResult.appendChild(ele);
    });
}

function loadMap() {
    return localStorage.getItem(map) ? new Map(JSON.parse(localStorage.getItem(map))) : new Map();
}

function weatherIcon(weatherId) {
    return `http://openweathermap.org/img/wn/${weatherId}@2x.png`;
}

function deleteHistory(){
    localStorage.clear()
    setTimeout(() => {  scrollToTop(); }, 250);
    setTimeout(() => {  location.reload(); }, 750);
}

const inputBox = document.querySelector('.inputBox')
const sectionOneHeading = document.querySelector('.sectionOneHeading')
const buttonSearch = document.querySelector('.buttonSearch')

const timeline = new TimelineMax();
timeline.fromTo(sectionOneHeading, 1, {opacity: "0"}, {opacity: "1"})
    .fromTo(inputBox, 1, {opacity: "0"}, {opacity: "1"})
    .fromTo(buttonSearch, 1, {opacity: "0"}, {opacity: "1"});

function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}