import React from "react";
import type { DailyWeather } from "./weatherTypes.ts";

interface DailyProps {
    daily: DailyWeather;
}

const Daily: React.FC<DailyProps> = ({ daily }) => {
    return (
        <div style={{ marginTop: "20px" }}>
            <h2>Daily Forecast</h2>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {daily.time.map((date, i) => (
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
                        <h3>{new Date(date).toLocaleDateString()}</h3>

                        <p><strong>High:</strong> {daily.temperature_2m_max[i]}°F</p>
                        <p><strong>Low:</strong> {daily.temperature_2m_min[i]}°F</p>

                        <p><strong>Sunrise:</strong> {daily.sunrise[i]}</p>
                        <p><strong>Sunset:</strong> {daily.sunset[i]}</p>

                        <p><strong>Precipitation:</strong> {daily.precipitation_sum[i]} in</p>
                        <p><strong>Precip Prob:</strong> {daily.precipitation_probability_max[i]}%</p>

                        <p><strong>Wind Max:</strong> {daily.wind_speed_10m_max[i]} mph</p>
                        <p><strong>Gust Max:</strong> {daily.wind_gusts_10m_max[i]} mph</p>

                        <p><strong>Weather Code:</strong> {daily.weather_code[i]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Daily;