let searchButtonEl=document.querySelector('.searchButton');
let todayTemp;
let todayHm;
let todayWind;
let latcoord;
let loncoord;
let todayUV;
searchButtonEl.addEventListener('click', function(){
    let cityQueryEl=document.querySelector('#cityQuery').value;
    let todaysUrl= 'https://api.openweathermap.org/data/2.5/weather?q='+ cityQueryEl +'&appid=10265beafaf4ca91897568ef6f7efa26&units=imperial';
    
    console.log(cityQueryEl);
    fetch(todaysUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        todayTemp=data.main.temp;
        todayHm=data.main.humidity
        todayWind=data.wind.speed;
        latcoord=data.coord.lat;
        loncoord=data.coord.lon;
        console.log(latcoord)
        console.log(loncoord)
        let todaysOneUrl='https://api.openweathermap.org/data/2.5/onecall?lat='+latcoord+'&lon='+loncoord+'&exclude={part}&appid=10265beafaf4ca91897568ef6f7efa26&units=imperial';
        fetch(todaysOneUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        console.log(data)
        todayUV=data.current.uvi;
        todayTemp=data.current.temp;
        todayHm=data.current.humidity
        todayWind=data.current.wind_speed;
        todayIcon=data.current.weather[0].icon;
        console.log(todayIcon);
        console.log(todayTemp);
        console.log(todayHm);
        console.log(todayWind);
        console.log(todayUV);
        let iconUrl='http://openweathermap.org/img/wn/' + todayIcon + '@2x.png'
        console.log(iconUrl);
        })

    })
})