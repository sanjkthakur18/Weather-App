import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classes from "./Email.module.css";

const Email = (props) => {
    const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    if (name === 'email') setEmail(value);
    if (name === 'subject') setSubject(value);
    if (name === 'message') setMessage(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Email Submitted');
    
        try {
            await axios.post('/send-email', { email, subject, message });
          console.log('Email sent successfully');
          // Display a success message or perform any necessary actions
        } catch (error) {
          console.error('Error sending email:', error);
          // Display an error message or handle the error as needed
        }
    };

    return (
        <>
            <div className={classes.wrap1}>
                <div className={classes.formContainer}>
                    <fieldset>
                        <legend>||</legend>
                        <form onSubmit={handleSubmit} className={classes.verifyEmail}>
                            <label htmlFor="email">Enter Email <br /> <input type="email" pattern="^[a-z0-9]{1}[a-z0-9._]{0,}\@[a-z0-9]{1}[a-z0-9-]{1,}\.[a-z]{2}[a-zA-Z.]{0,}$" autoFocus autoComplete="off" required name="email" value={email} onChange={handleChange} placeholder="youremail@gmail.com" className={classes.email} /><span className={classes.emailerror}></span></label>
                            <button type="submit">Submit</button>
                        </form>
                        <button className={classes.btn}><Link to="/signin" className={classes.active}>Go back to login page.</Link></button><br />
                    </fieldset>
                </div>
            </div>
        </>
    );
};
export default Email;