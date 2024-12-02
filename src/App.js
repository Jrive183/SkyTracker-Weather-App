import React, { useState } from 'react';

const WeatherApp = () => {
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [date, setDate] = useState('');
    const [weather, setWeather] = useState(null);

    const apiKey = 'API Key Goes Here';

    const fetchWeather = async () => {
        const time = Math.floor(new Date(date).getTime() / 1000); // Convert date to UNIX timestamp
        const url = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=${apiKey}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error fetching weather data');
            const data = await response.json();
            setWeather(data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div>
            <h1>Historical Weather App</h1>
            <input
                type="text"
                placeholder="Enter latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter longitude"
                value={lon}
                onChange={(e) => setLon(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={fetchWeather}>Get Weather</button>
            {weather && (
    <div>
        <h2>Weather Data:</h2>
        <p>Temperature: {(weather.data[0].temp - 273.15).toFixed(2)}°C</p> {/* Convert Kelvin to Celsius */}
        <p>Feels Like: {(weather.data[0].feels_like - 273.15).toFixed(2)}°C</p> {/* Feels like temp */}
        <p>Humidity: {weather.data[0].humidity}%</p> {/* Humidity */}
        <p>Weather: {weather.data[0].weather[0].description}</p> {/* Description */}
    </div>
)}

        </div>
    );
};

export default WeatherApp;
