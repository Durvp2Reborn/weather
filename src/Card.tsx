import React from "react";

interface CardProps {
    date: string;
    location: string;
    temperature: number;
}

const Card: React.FC<CardProps> = ({ date, location, temperature }) => {
    return (
        <div className="card">
            <h1>{location}</h1>
            <p>Date: {new Date(date).toLocaleDateString()}</p>
            <p>Temperature: {temperature}°F</p>
        </div>
    );
};

export default Card;