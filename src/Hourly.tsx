import React from "react";
import type { HourlyWeather } from "./weatherTypes.ts";

interface HourlyProps {
    hourly: HourlyWeather;
}

const Hourly: React.FC<HourlyProps> = ({ hourly }) => {
    return (
        <div className="hourly-container">
            <h2 className="section-title">Hourly Forecast</h2>
            <div className="hourly-grid">
                {hourly.time.map((time, i) => (
                    <div className="hourly-item" key={i}>
                        <h4>{new Date(time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</h4>
                        <p>Temp: {hourly.temperature_2m[i]}°F</p>
                        <p>Wind: {hourly.wind_speed_10m[i]} mph</p>
                        <p>Precip: {hourly.precipitation[i]} in</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hourly;