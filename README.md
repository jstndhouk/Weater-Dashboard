# Weather-Dashboard

# Description
This application uses a weather API to grab weather data from a server and display it on the page.  The user inputs a city, and the daily weather appears as well as a five day forecast below the daily weather.  Once a city has been entered, a button appears on the left side so that the weather data from that city can be called again.  

This was done using an event lister on the search button, as well as an event listener listening to the buttons populated by previous searches via a loop.  

There are two API fetches here.  One uses the city name to grab the lattitude and longitudes coordinates.  The second uses those coordinates to grab all the relevant weather data.  

The future forecast uses a loop such that if more days were to be desired to be shown, changing one number in the loop statement would allow for that.

# Screenshots
![Capture2](https://user-images.githubusercontent.com/88453191/137648134-20b17533-940a-4017-8e65-5a41dc406fad.png)
![Capture1](https://user-images.githubusercontent.com/88453191/137648136-e78a1547-7f3c-47a4-bb4b-653cb39c073d.png)

# Deployed Application
https://jstndhouk.github.io/Weather-Dashboard/
