function Register() {
    return (
        <div className="register-form container-fluid">
            <form className="register-form">
                <h2>Register</h2>

                <label for="username">Username:</label>
                <input name="username" type="text"></input>

                <label for="password">Password:</label>
                <input name="password" type="password"></input>

                <label for="confirm-password">Confirm Password:</label>
                <input name="confirm-password" type="password"></input>

                <submit>Register</submit>
            </form>
        </div>
    );
}

function Login() {
    return (
        <div className="login-form-container main">
            <form className="login-form">
                <h2>Login</h2>

                <label for="username">Username:</label>
                <input name="username" type="text"></input>

                <label for="password">Password:</label>
                <input name="password" type="password"></input>

                <submit>Login</submit>
            </form>
        </div>
    );
}

function Logout() {
    return (
        <div>
            <h2>Logout</h2>
        </div>
    );
}

export {
    Register,
    Login,
    Logout,
};
