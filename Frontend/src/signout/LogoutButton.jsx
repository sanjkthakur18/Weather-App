import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import classes from "./LogoutButton.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
// import { MyContext } from "../signin/Signin";

const LogoutButton = () => {

  // const isLogged = useContext(MyContext);
  const [name, setName] = useState({name:""});
  const navigate = useNavigate();

    const getData = async () => {
      try {
        const response = await axios.get("https://6450d2b7a32219691152a162.mockapi.io/weather");
        // console.log(response);
        const getUser = response.data.find((user) => user.email === localStorage.getItem("email"));

       if(getUser){
        setName({name:getUser.name});
       }
      }
      catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getData();
    },[]);

  const logOut = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);

      const email = localStorage.getItem("email");
      if (email) {
        localStorage.clear();
      }

      navigate("/signin");
      console.log("Logged out successfully.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <span className={classes.span}>Hello, {name.name}</span>
      <button onClick={logOut}>SignOut</button>
    </>
  );
};

export default LogoutButton;