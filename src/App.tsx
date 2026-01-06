import {useAutoComplete, useWeather} from "./hooks.tsx";
import {useLocation} from "./hooks.tsx";
import { useState, useEffect } from 'react';
import Hourly from "./Hourly.tsx";
import Daily from "./Daily.tsx";
import Card from "./Card.tsx";

import './App.css';

function App() {

    const [searchTerm, setSearchTerm] = useState<string>('Freehold');
    const [currPlace, setCurrPlace] = useState<string>('');
    const autoComplete = useAutoComplete(searchTerm);
    const [lat, lon] = useLocation(currPlace);
    const weather = useWeather(lat, lon);

    useEffect(() => {
        if (weather?.current) {
            const isDay = weather.current.is_day === 1;
            document.body.style.backgroundColor = isDay ? "#FF8C00" : "#2F4F4F"; // Dark orange for day, dark gray for night
        }
    }, [weather]);

    return (
        <div className="app-container">
            <header className="app-header">
                <input
                    className="search-input"
                    value={searchTerm}
                    type="text"
                    placeholder="Search for a location..."
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button className="search-button" onClick={() => setCurrPlace(searchTerm)}>Search</button>
                <div className="autocomplete-container">
                    {autoComplete.map((auto, index) => (
                        <button
                            className="autocomplete-item"
                            key={index}
                            onClick={() => {
                                setCurrPlace(auto.formatted);
                                setSearchTerm(auto.formatted);
                            }}
                        >
                            {auto.formatted}
                        </button>
                    ))}
                </div>
            </header>
            <main className="weather-container">
                {weather && (
                    <>
                        <Card
                            date={weather.current.time}
                            location={searchTerm}
                            temperature={weather.current.temperature_2m}
                        />
                        <div className="weather-details">
                            <Hourly hourly={weather.hourly} />
                            <Daily daily={weather.daily} />
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default App;