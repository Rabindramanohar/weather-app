import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import keys from './../key';
import './selectedCity.css';

const api = {
    key: keys.API_KEY,
    base: keys.BASE_URL,
};
function SelectedCity(props) {

    const currDate = () => {
        let date = new window.Date().toString();
        date = date.slice(3, 15);
        return date;
    };

    const [query, setQuery] = useState(props.cityName);
    const [weather, setWeather] = useState({});


    useEffect(() => {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setQuery(props.cityName);
                setWeather(result);
                console.log(result);
                console.log(props.cityName);
            });
    }, [props.cityName, query]);

    return (
        <Box>
            <main style = {{textAlign: 'center'}}>
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
                                <div>current temp: {weather.main.temp}<span>&#176;</span>C</div>
                                <div>max temp: {weather.main.temp_max}<span>&#176;</span>C</div>
                                <div>min temp: {weather.main.temp_min}<span>&#176;</span>C</div>
                                <div>humidity: {weather.main.humidity}%</div>
                                <div>wind speed: {weather.wind.speed} km/hr</div>
                            </div>
                            <div className = "weather">
                                {weather.weather[0].main}
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div className = "error-message">
                                <div>You entered <span style = {{color: 'red', fontWeight: 'bold'}}>wrong city</span> — <strong> Please check it out!</strong></div>
                        </div>
                    )}
            </main>

        </Box>
    )
}

export default SelectedCity
