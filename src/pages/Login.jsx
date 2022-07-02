import React, { useState } from "react";

import {
BrowserRouter as Router,
useNavigate,
Navigate,
Routes,
Route,
} from "react-router-dom";
import "./login.css";

function Login() {
  // React States
	const [errorMessages, setErrorMessages] = useState({});
	const [isSubmitted, setIsSubmitted] = useState(false);

	const errors = {
    email: "invalid email",
    password: "invalid password",
	};

	const handleSubmit = (event) => {
    event.preventDefault();

    var { email, password } = document.forms[0];

    // Find user login info
    fetch("http://127.0.0.1:8000/api/login", {
		method: "POST",
		headers: {
        "Content-Type": "application/json",
        accept: "application/json",
	},
	body: JSON.stringify({
        email: email.value,
        password: password.value,
	}),
    })
      // fetch('http://127.0.0.1:8000/api/poll/' + e.currentTarget.getAttribute("data-id") + '/vote/' + e.currentTarget.getAttribute("data-choices_id"))
    .then((response) => {
        if (response.status === 200) {
        	return response.json();
        } else {
        	alert("Login Gagal");
        }
    }).then(function (json) {
        localStorage.setItem("user", JSON.stringify(json));
    });
    // Compare user info
    // if (userData) {
    //   if (userData.password !== pass.value) {
    //     // Invalid password
    //     setErrorMessages({ name: "pass", message: errors.pass });
    //   } else {
    //     setIsSubmitted(true);
    //   }
    // } else {
    //   // Username not found
    //   setErrorMessages({ name: "uname", message: errors.uname });
    // }
};

  // Generate JSX code for error message
	const renderErrorMessage = (name) =>
    name === errorMessages.name && (
    	<div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
const renderForm = (
    <div className="form">
    	<form onSubmit={handleSubmit}>
        <div className="input-container">
        <label>Email </label>
        <input type="email" name="email" required />
        {renderErrorMessage("email")}
        </div>
        <div className="input-container">
        <label>Password </label>
        <input type="password" name="password" required />
        {renderErrorMessage("password")}
        </div>
        <div className="button-container">
        <input type="submit" />
        </div>
    </form>
    </div>
);

const loggedInUser = localStorage.getItem("user");
if (loggedInUser === null) {
    return (
    <div className="Login">
        <div className="login-form">
        	<div className="title">Sign In</div>
        	{isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        </div>
    </div>
    );
	} else {
    return <Navigate to="/" />;
	}
}

export default Login;
