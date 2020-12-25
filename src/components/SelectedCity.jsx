import { Container } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import keys from './../key';

const api = {
    key: keys.API_KEY,
    base: keys.BASE_URL,
};
function SelectedCity() {

    const currDate = () => {
        let date = new window.Date().toString();
        date = date.slice(3, 15);
        return date;
    };

    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    const handleSearch = event => {
        if(event.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setQuery("");
                setWeather(result);
                console.log(result);
            })
        }
    }

    return (
        <div>
            <h1>Selected City</h1>
            <main>
                <div className = "search-container">
                    <input 
                        type = "text"
                        placeholder = "Enter you city.."
                        className = "search-bar"
                        onChange = {event => setQuery(event.target.value)}
                        value = {query}
                        onKeyPress = {handleSearch}
                    />
                </div>

                {typeof weather.main != "undefined" ? (
                    <div className = "location-container">
                        <div className = "location">
                            {weather.name}, {weather.sys.country}
                        </div>
                        <div className = "date">
                            {currDate(new Date())}
                        </div>
                        <div className = "weather-container">
                            <div className = "temperature">
                                {Math.round(weather.main.temp)}<span>&#176;</span>C
                            </div>
                            <div className = "weather">
                                {weather.weather[0].main}
                            </div>
                        </div>
                    </div>
                    ) : (
                        ""
                    )}
            </main>

        </div>
    )
}

export default SelectedCity
