import {useAutoComplete, useWeather} from "./hooks.tsx";
import {useLocation} from "./hooks.tsx";
import { useState} from 'react';
import Hourly from "./Hourly.tsx";
import Daily from "./Daily.tsx";
import Card from "./Card.tsx";

import './App.css'

function App() {

  const [searchTerm, setSearchTerm] = useState<string>('Freehold');
    const [currPlace, setCurrPlace] = useState<string>('');



const autoComplete = useAutoComplete(searchTerm);
const [lat, lon] = useLocation(currPlace);

     const weather = useWeather(lat, lon);


  return (
      <>
          <input id={"search"}
                 value={searchTerm}
                 type="text"
                 placeholder="Type here to search"
                 onChange={e => {
                     setSearchTerm((e.target.value))
                 }}
          />
          <div> {autoComplete.map((auto, index) =>
              <div key={index}>
                  <button onClick={() => {
                      setCurrPlace(auto.formatted)
                      setSearchTerm(auto.formatted)
                  }}>
                      {auto.formatted}
                  </button>
              </div>
          )}
          </div>
          <button onClick={() => {
              setCurrPlace(searchTerm)

          }}>
              search
          </button>
          <div id="weather">
              {weather && (
                  <div>
                      <Card date={weather.current.time} location={searchTerm} temperature={weather.current.temperature_2m}/>
                      <h2>Current Weather</h2>
                      <p>Temperature: {weather.current.temperature_2m}°F</p>
                      <p>Feels like: {weather.current.apparent_temperature}°F</p>
                      <p>Humidity: {weather.current.relative_humidity_2m}%</p>
                      <p>Wind Speed: {weather.current.wind_speed_10m} mph</p>
                      <p>Weather Code: {weather.current.weather_code}</p>

                      <h3>Today's High/Low</h3>
                      <p>High: {weather.daily.temperature_2m_max[0]}°F</p>
                      <p>Low: {weather.daily.temperature_2m_min[0]}°F</p>

                      <h3>Sunrise/Sunset</h3>
                      <p>Sunrise: {weather.daily.sunrise[0]}</p>
                      <p>Sunset: {weather.daily.sunset[0]}</p>


                  </div>
              )}
              {weather && (
                  <div style={{ marginTop: "20px" }}>
                      <Hourly hourly={weather.hourly} />
                  </div>
              )}
              {weather && (
                  <div style={{ marginTop: "20px" }}>
                      <Daily daily={weather.daily} />
                  </div>
              )}
          </div>
      </>
  )
}

export default App
