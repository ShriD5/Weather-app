import React, { useState } from 'react';

import './index.css';

const api = {
    base: 'https://api.openweathermap.org/data/2.5/',
    key: 'API_KEY',
};

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState('');

    const search = (evt) => {
        if (evt.key == 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    setQuery('');
                    setWeather(result);
                });
        }
    };
    var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    let date = new Date().toLocaleDateString('en-US', options);

    return (
        <div
            className={
                typeof weather.main != 'undefined'
                    ? weather.main.temp > 16
                        ? 'app warm'
                        : 'app'
                    : 'app'
            }
        >
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search ..."
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {typeof weather.main != 'undefined' ? (
                    <div>
                        <div className="location-box">
                            <div className="location">
                                {weather.name},{weather.sys.country}
                            </div>
                            <div className="date">{date}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°C
                            </div>
                            <div className="weather">
                                {weather.weather[0].main}
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </main>
        </div>
    );
};

export default App;
