import React, {useState} from "react";
import classes from "./Feedback.module.css";
import axios from "axios";


const Feedback = () => {

    const [user, setUser] = useState({name:"", email:"", phone:"", address:"", message:""});

    const handleChange = (evt) => {
        setUser({...user, [evt.target.name]: evt.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
    };

    return(
        <>
            <div className={classes.wrap1}>
                <div className={classes.formContainer}>
                    <fieldset>
                        <legend>Feedback Form</legend>
                        <form onSubmit={handleSubmit} className={classes.signupForm}>
                            <label htmlFor="name">Enter Name: <br /> <input type="text" name="name" autoFocus autoComplete="off" required placeholder="your name" onChange={handleChange} value={user.name} className={classes.name} /></label>
                            <label htmlFor="email">Enter Email: <br /> <input type="email" pattern="/^[a-z0-9]{1}[a-z0-9._]{0,}\@[a-z0-9]{1}[a-z0-9-]{1,}\.[a-z]{2}[a-zA-Z.]{0,}$/" autoFocus autoComplete="off" required name="email" value={user.email} onChange={handleChange} placeholder="youremail@gmail.com" className={classes.email} /></label>
                            <label htmlFor="phone">Phone: <input type="phone" name="phone" maxLength="10" className={classes.phone} onChange={handleChange} value={user.phone} placeholder="phone number" required autoFocus autoComplete="off" /></label>
                            <label htmlFor="address">Address: <textarea name="address" className={classes.address} onChange={handleChange} autoComplete="off" autoFocus value={user.address} cols="30" rows="7" required></textarea></label>
                            <label htmlFor="message">Message: <textarea name="message" className={classes.message} onChange={handleChange} autoComplete="off" autoFocus value={user.message} cols="30" rows="10" required></textarea></label>
                            <button type="submit">Submit</button>
                        </form>
                    </fieldset>
                </div>
            </div>
        </>
    )
};
export default Feedback;