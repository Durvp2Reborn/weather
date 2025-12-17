import { useState } from 'react';
import './App.css';
import { useWeather, useLocation, useAutoComplete } from './hooks';

interface AutocompleteResult {
  formatted: string;
  city: string;
  state: string;
  lat: number;
  lon: number;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  
  // Get autocomplete results
  const autocompleteResults = useAutoComplete(searchTerm);
  
  // Get coordinates from selected location
  const coords = useLocation(selectedLocation);
  
  // Get weather data using coordinates
  const weather = useWeather(coords?.lat, coords?.lon);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowAutocomplete(value.length >= 2);
  };

  const handleSelectLocation = (result: AutocompleteResult) => {
    setSelectedLocation(result.formatted);
    setSearchTerm(result.formatted);
    setShowAutocomplete(false);
  };

  const handleSearch = () => {
    if (searchTerm) {
      setSelectedLocation(searchTerm);
      setShowAutocomplete(false);
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      
      {/* Search Input with Autocomplete */}
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchTerm.length >= 2 && setShowAutocomplete(true)}
          placeholder="Search for a city..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
        
        {/* Autocomplete List */}
        {showAutocomplete && autocompleteResults.length > 0 && (
          <ul className="autocomplete-list">
            {autocompleteResults.map((result: AutocompleteResult, index: number) => (
              <li
                key={index}
                onClick={() => handleSelectLocation(result)}
                className="autocomplete-item"
              >
                {result.formatted}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Weather Display */}
      {weather && (
        <div className="weather-container">
          <h2>Current Weather</h2>
          <div className="weather-info">
            <div className="weather-item">
              <strong>Temperature:</strong> {weather.current?.temperature_2m}°F
            </div>
            <div className="weather-item">
              <strong>Feels Like:</strong> {weather.current?.apparent_temperature}°F
            </div>
            <div className="weather-item">
              <strong>Humidity:</strong> {weather.current?.relative_humidity_2m}%
            </div>
            <div className="weather-item">
              <strong>Wind Speed:</strong> {weather.current?.wind_speed_10m} mph
            </div>
            <div className="weather-item">
              <strong>Wind Gusts:</strong> {weather.current?.wind_gusts_10m} mph
            </div>
            <div className="weather-item">
              <strong>Precipitation:</strong> {weather.current?.precipitation} in
            </div>
          </div>

          {/* Daily Forecast */}
          {weather.daily && (
            <div className="forecast-container">
              <h3>7-Day Forecast</h3>
              <div className="forecast-grid">
                {weather.daily.time?.slice(0, 7).map((date: string, index: number) => (
                  <div key={index} className="forecast-day">
                    <div className="forecast-date">{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                    <div className="forecast-temps">
                      <span className="temp-max">{weather.daily.temperature_2m_max[index]}°</span>
                      <span className="temp-min">{weather.daily.temperature_2m_min[index]}°</span>
                    </div>
                    <div className="forecast-detail">
                      Precipitation: {weather.daily.precipitation_probability_max[index]}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {coords && !weather && (
        <div className="loading">Loading weather data...</div>
      )}
    </div>
  );
}

export default App;
