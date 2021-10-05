let searchButtonEl = document.querySelector('.searchButton');
let currentCityEl = document.querySelector('#currentCity');
let todaysDate = moment().format("L");
let todaysWeatherEl = document.querySelector('#todaysWeather');
let fiveDayEl = document.querySelector('#fiveDay');
let weatherDataEl = document.querySelector('#weatherData');
let fiveDayTitleEl = document.querySelector('#fiveDayTitle');
let savedButtonsEl = document.querySelector('.savedButtons');
let todayTemp;
let todayHm;
let todayWind;
let latcoord;
let loncoord;
let todayUV;
let nextDay = [];
let tempFutureDay = [];
let windFutureDay = [];
let hmFutureDay = [];
let iconFutureDay = [];
let futureIcon = []
let futureTemp = [];
let futureWind = [];
let futureHm = [];
let futureIconAppend = [];
let futureAppend = [];
let storedCities = [];
//Grabs cities from local storage
let cityArray = JSON.parse(localStorage.getItem("Cities")) || [];
//Puts the search history buttons on the page before the event listener.
for (i = 0; i < cityArray.length; i++) {
    storedCities[i] = document.createElement('button')
    storedCities[i].innerText = cityArray[i];
    savedButtonsEl.append(storedCities[i]);
    storedCities[i].setAttribute('id', '#cityButton');
}
//Event listener for the search button
searchButtonEl.addEventListener('click', function pullData() {
//Clears things and grabs city to put into the API URL.
savedButtonsEl.innerHTML = '';
fiveDayEl.innerHTML = '';
weatherDataEl.textContent = '';
let cityQueryEl = document.querySelector('#cityQuery')
let cityName = cityQueryEl.value;
let todaysUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=10265beafaf4ca91897568ef6f7efa26&units=imperial';
//fetches the lat and long using the city name
fetch(todaysUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        latcoord = data.coord.lat;
        loncoord = data.coord.lon;
        let todaysOneUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latcoord + '&lon=' + loncoord + '&exclude={part}&appid=10265beafaf4ca91897568ef6f7efa26&units=imperial';
        //fetches weather data
        fetch(todaysOneUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                todaysWeatherEl.setAttribute('style', 'display:flex')
                //todays data
                todayUV = data.current.uvi;
                todayTemp = data.current.temp;
                todayHm = data.current.humidity
                todayWind = data.current.wind_speed;
                todayIcon = data.current.weather[0].icon;
                //Creates and appends elements for the daily data
                let iconUrl = 'http://openweathermap.org/img/wn/' + todayIcon + '@2x.png'
                let iconAppend = document.createElement("img");
                iconAppend.setAttribute('src', iconUrl);
                iconAppend.setAttribute('style', 'width:50px; height:50px')
                currentCityEl.textContent = (cityName + " (" + todaysDate + ') ');
                currentCityEl.append(iconAppend);
                let tempAppend = document.createElement('p')
                let hmAppend = document.createElement('p')
                let windAppend = document.createElement('p')
                let UVAppend = document.createElement('p')
                tempAppend.innerText = 'Temp: ' + todayTemp + ' F';
                hmAppend.innerText = 'Humidity: ' + todayHm + '%';
                windAppend.innerText = 'Wind Speed: ' + todayWind + ' MPH';
                UVAppend.innerText = 'UV Index: ' + todayUV;
                if (todayUV > 2 && todayUV < 7)
                    UVAppend.setAttribute('style', 'color:orange')
                else if (todayUV > 6)
                    UVAppend.setAttribute('style', 'color:red')
                else
                    UVAppend.setAttribute('style', 'color:green')

                weatherDataEl.append(tempAppend, hmAppend, windAppend, UVAppend);
                //five day forecast data
                for (i = 0; i < 5; i++) {
                    //storing daily data
                    tempFutureDay[i] = data.daily[i].temp.day;
                    windFutureDay[i] = data.daily[i].wind_speed;
                    hmFutureDay[i] = data.daily[i].humidity;
                    iconFutureDay[i] = data.daily[i].weather[0].icon;
                    futureIcon[i] = 'http://openweathermap.org/img/wn/' + iconFutureDay[i] + '@2x.png';
                    //creating and appending elements
                    futureAppend[i] = document.createElement('div')
                    futureWind[i] = document.createElement('div')
                    futureHm[i] = document.createElement('div')
                    futureTemp[i] = document.createElement('div')
                    futureIconAppend[i] = document.createElement('img');
                    futureIconAppend[i].setAttribute('src', futureIcon[i]);
                    futureIconAppend[i].setAttribute('style', 'width:50px; height:50px')
                    nextDay[i] = moment().add(i + 1, 'd').format("L")
                    futureTemp[i].innerText = 'Temp: ' + tempFutureDay[i] + " F"
                    futureWind[i].innerText = 'Wind Speed: ' + windFutureDay[i] + " MPH"
                    futureHm[i].innerText = 'Humidity: ' + hmFutureDay[i] + '%'
                    futureAppend[i].append(nextDay[i], futureIconAppend[i], futureTemp[i], futureWind[i], futureHm[i]);
                    futureAppend[i].style.backgroundColor = 'rgb(0, 0, 102)';
                    futureAppend[i].style.color = 'white';
                    futureAppend[i].style.flex = 'justify-content:space-between';
                    futureAppend[i].style.marginRight = '20px';
                    futureAppend[i].style.paddingRight = '5px';
                    futureAppend[i].style.paddingLeft = '5px';
                    futureAppend[i].style.paddingBottom = '5px';
                    fiveDayEl.append(futureAppend[i]);
                    fiveDayTitleEl.setAttribute('style', 'display: inline')
                }
                //if the array already has a city, do not push it again       
                if (cityArray.indexOf(cityName) === -1) {
                    cityArray.push(cityName);
                    localStorage.setItem("Cities", JSON.stringify(cityArray));
                }
                for (i = 0; i < cityArray.length; i++) {
                    storedCities[i] = document.createElement('button')
                    storedCities[i].innerText = cityArray[i];
                    console.log(storedCities[i]);
                    savedButtonsEl.append(storedCities[i]);
                    console.log(savedButtonsEl)
                    storedCities[i].setAttribute('id', '#cityButton');
                }
                savedButtonsEl.addEventListener('click', function (event) {
                    for (i = 0; i < storedCities.length; i++) {
                        if (event.target == storedCities[i]) {
                            cityName = event.target.innerHTML;
                            console.log(cityName)
                            console.log('entering the conditional')
                        }
                        
                    }
                    appendHistory(cityName);
                })

            })



    })
})


function appendHistory(cityName) {
    console.log('entering the funcrtion')
    fiveDayEl.innerHTML = '';
    weatherDataEl.textContent = '';
    let todaysUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=10265beafaf4ca91897568ef6f7efa26&units=imperial';
    //fetches the lat and long using the city name
    fetch(todaysUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            latcoord = data.coord.lat;
            loncoord = data.coord.lon;
            let todaysOneUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latcoord + '&lon=' + loncoord + '&exclude={part}&appid=10265beafaf4ca91897568ef6f7efa26&units=imperial';
            //fetches weather data
            fetch(todaysOneUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    todaysWeatherEl.setAttribute('style', 'display:flex')
                    //todays data
                    todayUV = data.current.uvi;
                    todayTemp = data.current.temp;
                    todayHm = data.current.humidity
                    todayWind = data.current.wind_speed;
                    todayIcon = data.current.weather[0].icon;
                    //Creates and appends elements for the daily data
                    let iconUrl = 'http://openweathermap.org/img/wn/' + todayIcon + '@2x.png'
                    let iconAppend = document.createElement("img");
                    iconAppend.setAttribute('src', iconUrl);
                    iconAppend.setAttribute('style', 'width:50px; height:50px')
                    currentCityEl.textContent = (cityName + " (" + todaysDate + ') ');
                    currentCityEl.append(iconAppend);
                    let tempAppend = document.createElement('p')
                    let hmAppend = document.createElement('p')
                    let windAppend = document.createElement('p')
                    let UVAppend = document.createElement('p')
                    tempAppend.innerText = 'Temp: ' + todayTemp + ' F';
                    hmAppend.innerText = 'Humidity: ' + todayHm + '%';
                    windAppend.innerText = 'Wind Speed: ' + todayWind + ' MPH';
                    UVAppend.innerText = 'UV Index: ' + todayUV;
                    if (todayUV > 2 && todayUV < 7)
                        UVAppend.setAttribute('style', 'color:orange')
                    else if (todayUV > 6)
                        UVAppend.setAttribute('style', 'color:red')
                    else
                        UVAppend.setAttribute('style', 'color:green')

                    weatherDataEl.append(tempAppend, hmAppend, windAppend, UVAppend);
                    //five day forecast data
                    for (i = 0; i < 5; i++) {
                        //storing daily data
                        tempFutureDay[i] = data.daily[i].temp.day;
                        windFutureDay[i] = data.daily[i].wind_speed;
                        hmFutureDay[i] = data.daily[i].humidity;
                        iconFutureDay[i] = data.daily[i].weather[0].icon;
                        futureIcon[i] = 'http://openweathermap.org/img/wn/' + iconFutureDay[i] + '@2x.png';
                        //creating and appending elements
                        futureAppend[i] = document.createElement('div')
                        futureWind[i] = document.createElement('div')
                        futureHm[i] = document.createElement('div')
                        futureTemp[i] = document.createElement('div')
                        futureIconAppend[i] = document.createElement('img');
                        futureIconAppend[i].setAttribute('src', futureIcon[i]);
                        futureIconAppend[i].setAttribute('style', 'width:50px; height:50px')
                        nextDay[i] = moment().add(i + 1, 'd').format("L")
                        futureTemp[i].innerText = 'Temp: ' + tempFutureDay[i] + " F"
                        futureWind[i].innerText = 'Wind Speed: ' + windFutureDay[i] + " MPH"
                        futureHm[i].innerText = 'Humidity: ' + hmFutureDay[i] + '%'
                        futureAppend[i].append(nextDay[i], futureIconAppend[i], futureTemp[i], futureWind[i], futureHm[i]);
                        futureAppend[i].style.backgroundColor = 'rgb(0, 0, 102)';
                        futureAppend[i].style.color = 'white';
                        futureAppend[i].style.flex = 'justify-content:space-between';
                        futureAppend[i].style.marginRight = '20px';
                        futureAppend[i].style.paddingRight = '5px';
                        futureAppend[i].style.paddingLeft = '5px';
                        futureAppend[i].style.paddingBottom = '5px';
                        fiveDayEl.append(futureAppend[i]);
                        fiveDayTitleEl.setAttribute('style', 'display: inline')
                    }
                    //if the array already has a city, do not push it again       
                    if (cityArray.indexOf(cityName) === -1) {
                        cityArray.push(cityName);
                        localStorage.setItem("Cities", JSON.stringify(cityArray));
                    }

                })
        })
}