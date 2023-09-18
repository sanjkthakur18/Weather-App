import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import classes from "./Password.module.css";

const Password = () => {
    const [password, setPassword] = useState({ password: "", newPassword: "" });

    const handleChange = (evt) => {
        setPassword({ ...password, [evt.target.name]: evt.tarfet.value })
    };
    const handleSubmit = () => {

    };
    return (
        <div className={classes.wrap1}>
            <div className={classes.formContainer}>
                <fieldset>
                    <legend>Reset Password</legend>
                    <form onSubmit={handleSubmit} className={classes.resetpassword}>
                        <label htmlFor="email">New Password <br /> <input type="password" autoFocus autoComplete="off" required name="password" value={password.password} onChange={handleChange} placeholder="password" className={classes.password} /></label>
                        <label htmlFor="password">Re-Enter Password <br /> <input type="password" autoFocus autoComplete="off" required name="re-enter password" value={password.newPassword} onChange={handleChange} placeholder="password" className={classes.password} /></label>
                        <button type="submit">Reset</button>
                    </form>
                </fieldset>
            </div>
        </div>
    )
};
export default Password;