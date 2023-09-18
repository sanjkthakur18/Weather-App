import React from "react";
import classes from "./Home.module.css";
import Img from '../images/SnowFall.webp';

const Home = () => {

    return (
        <>
            <div className={classes.wrap1}>
                <img src={Img} alt="snow-fall" />
            </div>
        </>
    );
};
export default Home;