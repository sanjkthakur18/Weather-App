import React from "react";
import { Route, Routes, Outlet, BrowserRouter as Router} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "../home/Home";
import Menubar from "../menubar/Menubar";
import Weather from "../weather/Weather";
import "./App.module.css";
import Cover from "../cover/Cover";
import SignIn from "../signin/Signin";
import SignUp from "../signup/Signup";
import Email from "../email/Email";
import Password from "../rstpassword/Password";
import Feedback from "../feedback/Feedback";
import Show from "../show/Show";

const App = () => {

  const MenuOutlet = () => {
    return (
     
        <>
          <Menubar />
          <Outlet />
        </>
       
    )
  };
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Cover />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<Email />} />
          <Route path="/reset-password" element={<Password />} />
          <Route element={<MenuOutlet />}>
            <Route path="/home" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/show" element={<Show />} />
          </Route>
        </Routes>
    </Router>
  );
};

export default App;