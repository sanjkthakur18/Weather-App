import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
// import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import classes from "./Weather.module.css";

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState([]);
    const [bckgrndImg, setBckgrndImg] = useState("");

    const handleChange = (evt) => {
        setCity(evt.target.value);
    };

    const getWindDirection = (angle) => {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(angle / 45) % 8;
        return directions[index];
    };

    const getData = async () => {
        const response = await axios.get(
            "https://6450d2b7a32219691152a162.mockapi.io/weather"
        );
        const loggedInUser = localStorage.getItem("email");
        const getUser = response.data.find((user) => user.email === loggedInUser);

        if (getUser && getUser.cities) {
            const weatherData = await Promise.all(
                getUser.cities.map(async (city) => {
                    const res = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=81da5ca090adf861717fd71753373575&units=metric`
                    );

                    const data = res.data;
                    const date = moment.unix(data.dt).utcOffset(data.timezone).format("MMMM Do YYYY, h:mm a");
                    const seher = data.name;
                    const country = data.sys.country ? `, ${data.sys.country}` : "";
                    const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                    const temperature = `${data.main.temp}\u00B0C`;
                    const feelslike = `${data.main.feels_like}\u00B0C`;
                    const main = data.weather[0].main ? `. ${data.weather[0].main}` : "";
                    const description = data.weather[0].description ? `. ${data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}` : "";
                    const windspeed = data.wind.speed ? `${data.wind.speed}m/s ${getWindDirection(data.wind.deg)}` : "";
                    const pressure = data.main.pressure ? `${data.main.pressure}hPa` : "";
                    const dewpoint = data.main.temp_min ? `${(((data.main.temp) - (100 - (data.main.humidity))) / 5).toFixed(2)}\u00B0C` : "";
                    const visibility = data.visibility ? `${data.visibility / 1000}km` : "";
                    const humidity = data.main.humidity ? `${data.main.humidity}%` : "";

                    const newWeather = {
                        id: data.id,
                        date,
                        seher,
                        country,
                        icon,
                        temperature,
                        feelslike,
                        main,
                        description,
                        windspeed,
                        pressure,
                        dewpoint,
                        visibility,
                        humidity,
                    };

                    return newWeather;
                })
            );
            setWeather(weatherData);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=81da5ca090adf861717fd71753373575&units=metric`
            );
            const data = response.data;
            const date = moment.unix(data.dt).format("MMMM Do YYYY, h:mm a");
            const seher = data.name;
            const country = data.sys.country ? `, ${data.sys.country}` : "";
            const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            const temperature = `${data.main.temp}\u00B0C`;
            const feelslike = `${data.main.feels_like}\u00B0C`;
            const main = data.weather[0].main ? `. ${data.weather[0].main}` : "";
            const description = data.weather[0].description ? `. ${data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}` : "";
            const windspeed = data.wind.speed ? `${data.wind.speed}m/s ${getWindDirection(data.wind.deg)}` : "";
            const pressure = data.main.pressure ? `${data.main.pressure}hPa` : "";
            const dewpoint = data.main.temp_min ? `${(((data.main.temp) - (100 - (data.main.humidity))) / 5).toFixed(2)}\u00B0C` : "";
            const visibility = data.visibility ? `${data.visibility / 1000}km` : "";
            const humidity = data.main.humidity ? `${data.main.humidity}%` : "";

            if(temperature > 30){
                setBckgrndImg("/public/view/img/weather/SnowFall.webp");
            }
            else {null}

            const newWeather = {
                id: data.id,
                date,
                seher,
                country,
                icon,
                temperature,
                feelslike,
                main,
                description,
                windspeed,
                pressure,
                dewpoint,
                visibility,
                humidity,
            };

            const res = await axios.get(`https://6450d2b7a32219691152a162.mockapi.io/weather`);
            const loggedInUser = localStorage.getItem("email");
            const getUser = res.data.find((user) => user.email === loggedInUser);
            let citiesData = []
            if (getUser.cities) citiesData = [...getUser.cities]
            else citiesData = []
            if (getUser) {
                await axios.put(`https://6450d2b7a32219691152a162.mockapi.io/weather/${getUser.id}`, {
                    cities: [...citiesData, seher]
                });
            };

            setWeather([...weather, newWeather]);
            setCity("");
        } catch (error) {
            console.log(error);
        }
    };

    const handleDel = async (id, seher) => {
        try {
            const loggedInUser = localStorage.getItem("email");
            const res = await axios.get(
                "https://6450d2b7a32219691152a162.mockapi.io/weather"
            );

            const getUser = res.data.find((item) => item.email === loggedInUser);
            if (getUser && getUser.cities) {
                const updatedCities = getUser.cities.filter((city) => city !== seher);
                await axios.put(
                    `https://6450d2b7a32219691152a162.mockapi.io/weather/${getUser.id}`,
                    { cities: updatedCities }
                );
                setWeather((prevWeather) => prevWeather.filter((weather) => weather.seher !== seher));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    /*     useEffect(() => {
            if (weather && weather.id) {
                showForecast(weather.id);
            }
        }, [weather]); */

    return (
        <>
            <div className={classes.wrap1} >
                <div className={classes.container} >
                    <div className={classes.row}>
                        <div className={classes.col12}  >
                            <form onSubmit={handleSubmit} className={classes.cityForm}>
                                <label htmlFor="city">
                                    <input type="text" autoFocus autoComplete="on" required name="city" value={city} onChange={handleChange} placeholder="Search City" className={classes.city}
                                    />
                                </label>
                                <button type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes.flex}>
                <div className={classes.container}>
                    {weather.map((user) => (
                        <div className={classes.show} key={user.id}>
                            <div className={classes.flexBox}>
                                <div className={classes.wrap2}>
                                    <div className={classes.container}>
                                        <div className={classes.detail}>
                                            <div className={classes.row}>
                                                <div className={classes.cityDetail}>
                                                    <div className={classes.col12}>
                                                        <span className={classes.date}>{user.date}</span>
                                                    </div>
                                                    <div className={`${classes.col12} ${classes.box}`}>
                                                        <h2 className={classes.name}>
                                                            {user.seher}
                                                            {user.country}
                                                        </h2>
                                                        <button type="submit" className={classes.btn} onClick={() => handleDel(user.id, user.seher)}>✕</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.wrap3}>
                                    <div className={classes.container}>
                                        <div className={classes.row}>
                                            <div className={classes.weatherTemp}>
                                                <div className={classes.col12}>
                                                    <span className={classes.temp}>
                                                        <img src={user.icon} alt="icon" /> {user.temperature}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={classes.row}>
                                            <div className={classes.weather}>
                                                <div className={classes.col12}>
                                                    <p className={classes.main}>
                                                        Feels Like: {user.feelslike}.{user.main}.{user.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={classes.row}>
                                            <div className={classes.detail}>
                                                <div className={classes.col12}>
                                                    <ul>
                                                        <div>
                                                            <li>
                                                                <div className={classes.col6}>{user.windspeed}</div>
                                                            </li>
                                                            <li>
                                                                <div className={classes.col6}>Humidity: {user.humidity}</div>
                                                            </li>
                                                        </div>
                                                        <div>
                                                            <li>
                                                                <div className={classes.col6}>{user.pressure}</div>
                                                            </li>
                                                            <li>
                                                                <div className={classes.col6}>Dew Point: {user.dewpoint}</div>
                                                            </li>
                                                        </div>
                                                        <div>
                                                            <li>
                                                                <div className={classes.col6}>Visibility: {user.visibility}</div>
                                                            </li>
                                                        </div>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/*                     {hourlyForecast.length > 0 && (
                        <div className={classes.wrap3}>
                            <div className={classes.container}>
                                <div className={classes.row}>
                                    <div className={classes.col12}>
                                        <div className={classes.chartContainer}>
                                            <Line
                                                data={hourlyForecast}
                                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                            >
                                                <XAxis
                                                    dataKey="dt"
                                                    tickFormatter={(unixTime) =>
                                                        moment.unix(unixTime).format("h:mm a")
                                                    }
                                                />
                                                <YAxis />
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <Tooltip />
                                                <Legend />
                                                <Line
                                                    type="monotone"
                                                    dataKey="main.temp"
                                                    name="Temperature (°C)"
                                                    stroke="rgba(75, 192, 192, 1)"
                                                    fill="rgba(75, 192, 192, 0.2)"
                                                />
                                            </Line>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )} */}
                </div>
            </div>
        </>
    );
};

export default Weather;