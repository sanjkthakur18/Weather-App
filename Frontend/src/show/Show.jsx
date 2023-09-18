import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Show.module.css";


const Show = () => {
    const [weather, setWeather] = useState([]);
    useEffect(() => {
        try {
            const userData = async () => {
                const response = await axios.get("https://6450d2b7a32219691152a162.mockapi.io/weather");
                /* const localUser = localStorage.getItem("email");
                const getUser = response.data.filter((item) => item.email === localUser);
                console.log(getUser);
                console.log(getUser.id);
                console.log(getUser.email); */
                setWeather(response.data);
            }
        } catch (error) {
            console.log(error);
        };
    }, []);

    const handleDel = async () => {
        try {
            await axios.delete(`https://6450d2b7a32219691152a162.mockapi.io/weather/${id}`)
            const arr = [...weather];
            arr.splice(index, 1);
            setWeather(arr);
            console.log("Weather datta has been deleted.");
        }  catch (error){
            console.log(error);
    };
    };

    return (
        <>
            <h1>Mock API Data</h1>
            {
                weather.map((user, i) => {
                    <div key={user.id}>
                        <h3>Name: {user.name}</h3><br />
                        <p>Email: {user.email}</p><br />
                        <p>Cities: {user.cities}</p>
                    </div>
                })
            }
        </>
    );
};
export default Show;