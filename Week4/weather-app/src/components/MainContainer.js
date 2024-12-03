import React, { useState, useEffect } from "react";
import "../styles/MainContainer.css"; // Import the CSS file for MainContainer

function MainContainer(props) {

  function formatDate(daysFromNow = 0) {
    let output = "";
    var date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    output += date.toLocaleString("en-US", { weekday: "long" }).toUpperCase();
    output += " " + date.getDate();
    return output;
  }

  /*
  STEP 1: IMPORTANT NOTICE!

  Before you start, ensure that both App.js and SideContainer.js are complete. The reason is MainContainer 
  is dependent on the city selected in SideContainer and managed in App.js. You need the data to flow from 
  App.js to MainContainer for the selected city before making an API call to fetch weather data.
  */
  
  /*
  STEP 2: Manage Weather Data with State.
  
  Just like how we managed city data in App.js, we need a mechanism to manage the weather data 
  for the selected city in this component. Use the 'useState' hook to create a state variable 
  (e.g., 'weather') and its corresponding setter function (e.g., 'setWeather'). The initial state can be 
  null or an empty object.
  */
  
  
  /*
  STEP 3: Fetch Weather Data When City Changes.
  
  Whenever the selected city (passed as a prop) changes, you should make an API call to fetch the 
  new weather data. For this, use the 'useEffect' hook.

  The 'useEffect' hook lets you perform side effects (like fetching data) in functional components. 
  Set the dependency array of the 'useEffect' to watch for changes in the city prop. When it changes, 
  make the API call.

  After fetching the data, use the 'setWeather' function from the 'useState' hook to set the weather data 
  in your state.
  */
  
  
  if (!props.city || !props.weather) {
    return <div id="main-container">Select a city to see weather</div>;
  }

  return (
    <div id="main-container">
      <div id="weather-container">
        <h5 id="todays-date">{formatDate(0)}</h5>
        <h2 id="weather-for">Weather for {props.city.fullName}</h2>
        
        <div id="current-weather-container">
          <div id="current-weather-info">
            <h2 id="current-weather-condition">{props.weather.condition}</h2>
            <h1 id="current-temperature">{Math.round(props.weather.temperature)}°</h1>
            <h5 id="current-aqi">AQI: {props.aqi?.index}</h5>
          </div>
          <img 
            id="current-weather-icon"
            src={`https://openweathermap.org/img/wn/${props.weather.icon}@2x.png`}
            alt="Weather icon"
            style={{visibility: 'visible'}}
          />
        </div>

        {props.forecast && (
          <div id="forecast-container" style={{visibility: 'visible'}}>
            {[1, 2, 3, 4, 5].map(day => {
              const dayData = props.forecast.list[day * 8 - 1];
              return (
                <div key={day} className="forecast-card">
                  <h4 className="forecast-date" id={`forecast-${day}-date`}>
                    {formatDate(day)}
                  </h4>
                  <img 
                    className="forecast-icon"
                    id={`forecast-${day}-icon`}
                    src={`https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`}
                    alt="Forecast icon"
                  />
                  <h4 className="forecast-min-max" id={`forecast-${day}-min-max`}>
                    {Math.round(dayData.main.temp_max)}° to {Math.round(dayData.main.temp_min)}°
                  </h4>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


export default MainContainer;

