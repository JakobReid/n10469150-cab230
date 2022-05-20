import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "reactstrap";

function Login({setCurrentUser }) {
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        const url = `http://sefdb02.qut.edu.au:3001/user/login`;
        const user = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.message);
                }
                else {
                    sessionStorage.setItem("token", data.token);
                    setCurrentUser(user.email);
                    navigate("/");
                }
            });
    };

    return (
        <div className="login-form-container container main">
            <form onSubmit={(e) => login(e)} className="user-form">
                <h2>Log in</h2>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" id="email" className="form-control"></input>
                </div>

                <div className="mb-3">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" className="form-control"></input>
                </div>


                <div className="row">
                    <div className="col">
                        <Button type="submit" color="warning">Log in</Button>
                    </div>
                    <div className="col register-link-container">
                        <a style={{ color: "#feb331", fontSize: "14px", textDecoration: "underline" } } href="/register">New user? Click here to register</a>
                    </div>
                </div>


            </form>
        </div >
    );
}

export default Login;