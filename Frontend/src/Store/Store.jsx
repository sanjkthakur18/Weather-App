/* import React, { createContext, useState } from 'react'
import axios from "axios";

export const WeatherContext = createContext();

const Store = (props) => {

    const getWeatherData = async (city) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=81da5ca090adf861717fd71753373575&units=metric`
            );
            if (response) return { result: "done", data: response }
            else return { result: "failed", message: "Internal Server Error" }
        } catch (error) {
            console.log(error.message);
        }
    };

    const setWeatherData = async (data) => {
        try {
            const res = await axios.post('https://6450d2b7a32219691152a162.mockapi.io/weathher', data);
            if (res) return { result: "done", data: response }
            else return { result: "failed", message: "Internal Server Error" }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <WeatherContext.Provider
            value={{ getWeatherData: getWeatherData, setWeatherData: setWeatherData }}>
            {props.children}
        </WeatherContext.Provider>
    )
}

export default Store; */