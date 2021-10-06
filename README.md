# Weater-Dashboard

# Description
This application uses a weather API to grab weather data from a server and display it on the page.  The user inputs a city, and the daily weather appears as well as a five day forecast below the daily weather.  Once a city has been entered, a button appears on the left side so that the weather data from that city can be called again.  

This was done using an event lister on the search button, as well as an event listener listening to the buttons populated by previous searches via a loop.  

There are two API fetches here.  One uses the city name to grab the lattitude and longitudes coordinates.  The second uses those coordinates to grab all the relevant weather data.  

The future forecast uses a loop such that if more days were to be desired to be shown, changing one number in the loop statement would allow for that.

# Screenshots
![Image output](./assets/images/capture1.PNG)
![Image output](./assets/images/capture2.PNG)

# Deployed Application
https://jstndhouk.github.io/Weater-Dashboard/