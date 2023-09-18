import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Cover.module.css";
import Img from '../images/RS5Y.gif';

const Cover = () => {

    return (
        <>
            <div className={classes.wrap1}>
                <div className={classes.container}>
                    <div className={classes.row}>
                        <div className={classes.col3}></div>
                        <div className={classes.col6}>
                            <h1 className={classes.heading}>Welcome to Weather App</h1>
                            {/*  <div className={classes.quote}>
                                <p>"Forecasting the skies, empowering your days. Let our weather web app be your guiding light through sun, rain, and
                                    everything in between. Amidst the ever-changing tapestry of nature's moods, our weather web app stands as your steadfast
                                    companion. Unveiling the secrets of the sky, it whispers the language of clouds, raindrops, and sunshine, empowering you
                                    to embrace each day with preparedness and wonder."</p>
                            </div> */}
                        </div>
                        <div className={classes.cover}>
                            <Link className={classes.btn} to="/signin">Click Here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cover;