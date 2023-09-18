import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./Signup.module.css"

const SignUp = (props) => {

    const [data, setData] = useState({ name: "", dob: "", gender: "", email: "", password: "" });
    const [confirmPass, setConfirmPass] = useState({ confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ name: "", dob: "", gender: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (evt) => {
        setData({ ...data, [evt.target.name]: evt.target.value });
    };

    const handlePass = (evt) => {
        setConfirmPass({ ...confirmPass, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (data.password.trim() === confirmPass.confirmPassword.trim()) {
                const response = await axios.get('https://6450d2b7a32219691152a162.mockapi.io/users');
                const res = await axios.get(
                    `http://127.0.0.1:4000/getalluser`
                );

                const existUser = response.data.filter((user) => user.email === data.email);
                const existingUser = res.data.filter((item) => item.email === data.email);
                if (existingUser.length > 0 && existUser.length > 0) {

                }
                else {
                    await axios.post('https://6450d2b7a32219691152a162.mockapi.io/users', {
                        name: data.name,
                        dob: data.dob,
                        gender: data.gender,
                        email: data.email,
                        password: data.password,

                    });
                    await axios.post(
                        "http://127.0.0.1:4000/signup-user", {
                        name: data.name,
                        gender: data.gender,
                        dob: data.dob,
                        email: data.email,
                        password: data.password,
                    });
                    alert("Account Created");
                    setData({ name: "", dob: "", gender: "", email: "", password: "" });
                    setConfirmPass({ confirmPassword: "" });
                    setShowPassword(!showPassword);
                    navigate("/signin", { replace: true });
                }
            } else {
                alert("Password Didn't Match");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className={classes.wrap1}>
                <div className={classes.formContainer}>
                    <fieldset>
                        <legend>Sign Up From</legend>
                        <form onSubmit={handleSubmit} className={classes.signupForm}>
                            <label htmlFor="name">Enter Name <br /> <input type="text" name="name" autoFocus autoComplete="off" required placeholder="your name" onChange={handleChange} value={data.name} className={classes.name} /></label>
                            <label htmlFor="gender">Gender <br />
                                <select aria-label="Gender" name="gender" value={data.gender} onChange={handleChange} required>
                                    <option value="" disabled>Select Gender</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                            </label>
                            <label htmlFor="bob">DOB <br /> <input type="date" name="dob" autoFocus autoComplete="off" required placeholder="date of birth" onChange={handleChange} value={data.dob} className={classes.dob} /></label>
                            <label htmlFor="email">Enter Email <br /> <input type="email" pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$" autoFocus autoComplete="off" required name="email" value={data.email} onChange={handleChange} placeholder="youremail@gmail.com" className={classes.email} /></label>
                            <label htmlFor="password">Enter Password <br /> <input type={!showPassword ? "password" : "text"} pattern="^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" autoFocus autoComplete="off" required name="password" value={data.password} onChange={handleChange} placeholder="password" className={classes.password} /></label>
                            <label htmlFor="check-password">Re-Enter Password <br /> <input type={!showPassword ? "password" : "text"} pattern="^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" autoFocus autoComplete="off" required name="confirmPassword" value={confirmPass.confirmPassword} onChange={handlePass} placeholder="confirm-password" className={classes.confirmPassword} /></label>
                            <label htmlFor="show-password">Show Password:<input type="checkbox" name="show-password" className={classes.showPassword} onChange={handleShowPassword} checked={showPassword} /></label>
                            <button type="submit">Sign Up</button>
                        </form>
                        <button className={classes.btn}>Already Have An Account? <Link to="/signin" className={classes.active}>Sign In Here.</Link></button>
                    </fieldset>
                </div>
            </div>
        </>
    )
};
export default SignUp;