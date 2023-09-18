import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import firebase from "../firebase/Firebase";
import classes from "./Signin.module.css";

const SignIn = () => {
    const [data, setData] = useState({ name: "", email: "", password: "", isLogged: false });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (evt) => {
        setData({ ...data, [evt.target.name]: evt.target.value });
        setErrors({ ...errors, [evt.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        const newErrors = { email: '', password: '' };
        console.log("Working");

        try {
            if (data.email === "") {
                newErrors.email = "Please Enter Your Email";
                valid = false;
            }

            if (data.password === "") {
                newErrors.password = "Please Enter Your Password (password@1234)";
                valid = false;
            }
            if (!valid) {
                setErrors(newErrors);
                return;
            }

            const response = await axios.get("https://6450d2b7a32219691152a162.mockapi.io/users");
            const existUser = response.data.filter(
                (user) => user.email === data.email && user.password === data.password
            )[0];

            if (existUser) {
                const res = await axios.get("https://6450d2b7a32219691152a162.mockapi.io/weather");
                const userData = res.data.filter((item) => item.email === existUser.email);

                console.log(userData);

                if (userData.length === 0) {
                    localStorage.setItem("email", data.email);
                    await axios.post("https://6450d2b7a32219691152a162.mockapi.io/weather", {
                        name: existUser.name,
                        email: existUser.email,
                    });

                    navigate("/home");
                    setData({ ...data, isLogged: true, name: existUser.name });
                    console.log("Logged In Successfully.");
                } else {
                    localStorage.setItem("email", data.email);
                    navigate("/home");
                    setData({ ...data, isLogged: true, name: existUser.name });
                    console.log("Logged In Successfully.");
                }
            } else {
                newErrors.email = "Email Does Not Exist.";
                newErrors.password = "Incorrect Password";
                valid = false;
                setData({ email: "", password: "" });
                setErrors(newErrors);
            }
        }
         catch (error) {
        console.log(error);
    }
};

const handleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    provider.setCustomParameters({
        login_hint: "user@email.com",
    });

    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            const response = await axios.get(
                "https://6450d2b7a32219691152a162.mockapi.io/weather"
            );

            console.log(response.data);

            const existingUser = response.data.filter(
                (item) => item.email === user.email
            );

            if (existingUser.length === 0) {
                await axios.post(
                    "https://6450d2b7a32219691152a162.mockapi.io/weather",
                    {
                        name: user.displayName,
                        email: user.email,
                    }
                );
            }

            navigate("/home");
            console.log("Logged In Successfully.");
            setData({ ...data, isLogged: true });
            setData({ name: user.displayName });
            localStorage.setItem("email", user.email);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
};

return (
    <>
        <div className={classes.wrap1}>
            <div className={classes.formContainer}>
                <fieldset>
                    <legend>Sign In Form</legend>
                    <form onSubmit={handleSubmit} className={classes.signinForm}>
                        <label className={classes.label} htmlFor="email">Enter Email <br /> <input type="email" autoFocus autoComplete="off" name="email" value={data.email} onChange={handleChange} placeholder="youremail@gmail.com" className={classes.email} /></label>
                        <span className={classes.error}>{errors.email}</span>
                        <label className={classes.label} htmlFor="password">Enter Password <br /> <input type="password" autoFocus autoComplete="off" name="password" value={data.password} onChange={handleChange} placeholder="password" className={classes.password} /></label>
                        <span className={classes.error}>{errors.password}</span>
                        <button type="submit">Login</button>
                    </form>
                    <button className={classes.btn}>Forgot password? <Link to="/verify-email" className={classes.active}>Click Here.</Link></button><br />
                    <button className={classes.btn}>Don't Have An Account? <Link to="/signup" className={classes.active}>Sign Up Here.</Link></button><br />
                    <button className={classes.btn} onClick={handleClick}>Sigin In with Google: <FcGoogle /></button>
                </fieldset>
            </div>
        </div>
    </>
)
};
export default SignIn;
//