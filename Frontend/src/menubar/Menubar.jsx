import React from "react";
import { Link } from "react-router-dom";
import classes from "./Menubar.module.css";
import LogoutButton from "../signout/LogoutButton";

const Menubar = () => {

    return (
        <>
            <div className={classes.wrap1}>
                <div className={classes.container}>
                    <div className={classes.row}>
                        <nav>
                            <div className={classes.navbar}>
                                <div>
                                    <Link to="/"></Link>
                                </div>
                                <div className={classes.col2}>
                                    <Link to="/home">Home</Link>
                                </div>
                                <div className={classes.col2}>
                                    <Link to="/weather">Weather</Link>
                                </div>
                                <div className={classes.col2}>
                                    <Link to="/feedback">Feedback</Link>
                                </div>
                                <div className={classes.col2}>
                                    <Link to="/show">Show</Link>
                                </div>
                            </div>
                        </nav>
                        <div className={classes.buttons}>
                            <div className={classes.col5}>
                               <LogoutButton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Menubar;