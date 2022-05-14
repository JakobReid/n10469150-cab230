import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "reactstrap";

function Login() {
    const [ass, setAss] = useState('Ass');
    const navigate = useNavigate();

    const login = () => {
        const url = `http://sefdb02.qut.edu.au:3001/user/login`;
        const user = {
            email: "mike@gmail.com",
            password: "password"
        }

        fetch(url, {
            method: "POST",
            headers: {accept: "application/json", "Content-Type": "application/json"},
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("token", data.token)
            navigate("/list")
        });
    }

    return (
        <div className="login-form-container main">
            <form className="login-form">
                <h2>Login</h2>
                <h2>{ass}</h2>

                <label for="username">Username:</label>
                <input name="username" type="text"></input>

                <label for="password">Password:</label>
                <input name="password" type="password"></input>

                <Button onClick={() => {login()}}>Login</Button>
            </form>
        </div>
    );
}

export default Login;