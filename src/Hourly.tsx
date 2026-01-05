import React from "react";
import type { HourlyWeather } from "./weatherTypes.ts";

interface HourlyProps {
    hourly: HourlyWeather;
}

const Hourly: React.FC<HourlyProps> = ({ hourly }) => {
    return (
        <div style={{ marginTop: "20px" }}>
            <h2>Hourly Forecast</h2>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {hourly.time.map((time, i) => (
                    <div
                        key={i}
                        style={{
                            borderRadius: "16px",
                            padding: "16px",
                            width: "200px",
                            background: "#ffffff",
                            boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                        }}
                    >
                        <h4>{new Date(time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</h4>
                        <p>Temp: {hourly.temperature_2m[i]}°F</p>
                        <p>Feels like: {hourly.apparent_temperature[i]}°F</p>
                        <p>Humidity: {hourly.relative_humidity_2m[i]}%</p>
                        <p>Wind: {hourly.wind_speed_10m[i]} mph</p>
                        <p>Precip: {hourly.precipitation[i]} in</p>
                        <p>Weather Code: {hourly.weather_code[i]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hourly;