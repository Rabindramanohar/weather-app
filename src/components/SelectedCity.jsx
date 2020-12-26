import React, { useEffect } from 'react';
import { useState } from 'react';
import keys from './../key';

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
                setQuery("");
                setWeather(result);
                console.log(result);
                console.log(props.cityName);
            });
    }, []);

    return (
        <div>
            <h1>Selected City</h1>
            <main style = {{textAlign: 'center'}}>
                <div className = "search-container">
                    
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
                                <div>current temp: {weather.main.temp}<span>&#176;</span>C</div>
                                <div>max temp: {weather.main.temp_max}<span>&#176;</span>C</div>
                                <div>min temp: {weather.main.temp_min}<span>&#176;</span>C</div>
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
