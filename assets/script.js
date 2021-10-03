let searchButtonEl=document.querySelector('.searchButton');
let currentCityEl=document.querySelector('#currentCity');
let todaysDate=moment().format("L");
let todaysWeatherEl=document.querySelector('#todaysWeather');
let weatherDataEl=document.querySelector('#weatherData');
let fiveDayEl=document.querySelector('#fiveDay');
let todayTemp;
let todayHm;
let todayWind;
let latcoord;
let loncoord;
let todayUV;
let tempFutureDay=[];
let windFutureDay=[];
let hmFutureDay=[];
let iconFutureDay=[];
let futureIcon=[]
let futureTemp=[];
let futureWind=[];
let futureHm=[];
let futureIconAppend=[];
let futureAppend=[];
//Grabs cities from local storage
let cityArray = JSON.parse(localStorage.getItem("Cities")) || [];

//Event listener for the search button
searchButtonEl.addEventListener('click', function(){
    weatherDataEl.textContent='';
    let cityQueryEl=document.querySelector('#cityQuery')
    let cityName=cityQueryEl.value;
    let todaysUrl= 'https://api.openweathermap.org/data/2.5/weather?q='+ cityName +'&appid=10265beafaf4ca91897568ef6f7efa26&units=imperial';
    
    //fetches the lat and long using the city name
    fetch(todaysUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        latcoord=data.coord.lat;
        loncoord=data.coord.lon;
        let todaysOneUrl='https://api.openweathermap.org/data/2.5/onecall?lat='+latcoord+'&lon='+loncoord+'&exclude={part}&appid=10265beafaf4ca91897568ef6f7efa26&units=imperial';
        //fetches weather data
        fetch(todaysOneUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        console.log(data)
        //todays data
        todayUV=data.current.uvi;
        todayTemp=data.current.temp;
        todayHm=data.current.humidity
        todayWind=data.current.wind_speed;
        todayIcon=data.current.weather[0].icon;
        //five day forecast data
        for(i=0; i<4; i++){
            //storing daily data
            tempFutureDay[i]=data.daily[i].temp.day;
            console.log("temp "+tempFutureDay[i])

            windFutureDay[i]=data.daily[i].wind_speed;
            console.log("wind "+windFutureDay[i])

            hmFutureDay[i]=data.daily[i].humidity;
            console.log("humidity "+hmFutureDay[i])

            iconFutureDay[i]=data.daily[i].weather[0].icon;
            futureIcon[i]='http://openweathermap.org/img/wn/' + iconFutureDay[i] + '@2x.png';
            console.log(futureIcon[i])
            
            //creating and appending elements
            futureAppend[i]=document.createElement('div')
            futureWind[i]=document.createElement('div')
            futureHm[i]=document.createElement('div')
            futureTemp[i]=document.createElement('div')
            futureIconAppend[i]=document.createElement('img');
            futureIconAppend[i].setAttribute('src',futureIcon[i]);
            futureIconAppend[i].setAttribute('style', 'width:50px; height:50px')
            futureTemp[i].innerText='Temp: ' + tempFutureDay[i] + " F"
            futureWind[i].innerText='Wind Speed: ' + windFutureDay[i] + " MPH"
            futureHm[i].innerText='Humidity: ' + hmFutureDay[i] + ' %'
            futureAppend[i].append(futureIconAppend [i], futureTemp[i], futureWind[i], futureHm[i]);
            fiveDayEl.append(futureAppend[i]);
        }
        
        currentCityEl.textContent=(cityName+" (" + todaysDate+ ') ');
        //if the array already        
        if (cityArray.indexOf(cityName)===-1){
            cityArray.push(cityName);
            localStorage.setItem("Cities", JSON.stringify(cityArray));
        }

        let iconUrl='http://openweathermap.org/img/wn/' + todayIcon + '@2x.png'
        let iconAppend=document.createElement("img");
        iconAppend.setAttribute('src',iconUrl);
        iconAppend.setAttribute('style', 'width:50px; height:50px')
        currentCityEl.appendChild(iconAppend);

        let tempAppend=document.createElement('p')
        let hmAppend=document.createElement('p')
        let windAppend=document.createElement('p')
        let UVAppend=document.createElement('p')
        tempAppend.innerText='Temp: ' + todayTemp + ' F';
        hmAppend.innerText='Humidity: ' + todayHm + '%';
        windAppend.innerText='Wind Speed: ' + todayWind + ' MPH';
        UVAppend.innerText='UV Index: ' + todayUV;
        weatherDataEl.append(tempAppend, hmAppend, windAppend, UVAppend);


        
        

        })
    })
})