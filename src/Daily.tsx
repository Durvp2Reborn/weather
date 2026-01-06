import React from "react";
import type { DailyWeather } from "./weatherTypes.ts";

interface DailyProps {
    daily: DailyWeather;
}

const Daily: React.FC<DailyProps> = ({ daily }) => {
    return (
        <div className="daily-container">
            <h2 className="section-title">Daily Forecast</h2>
            <div className="daily-grid">
                {daily.time.map((date, i) => (
                    <div className="daily-item" key={i}>
                        <h3 className="daily-date">{new Date(date).toLocaleDateString()}</h3>
                        <p><strong>High:</strong> {daily.temperature_2m_max[i]}°F</p>
                        <p><strong>Low:</strong> {daily.temperature_2m_min[i]}°F</p>
                        <p><strong>Sunrise:</strong> {daily.sunrise[i]}</p>
                        <p><strong>Sunset:</strong> {daily.sunset[i]}</p>
                        <p><strong>Precipitation:</strong> {daily.precipitation_sum[i]} in</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Daily;