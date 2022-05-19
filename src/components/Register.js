import { useNavigate } from "react-router";
import { Button } from "reactstrap"

function Register() {

    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();
        console.log(e.target.confirmPassword)

        if (e.target.confirmPassword.value !== e.target.password.value) {
            alert("Error: Passwords do not match. Please re-enter.");
            return;
        }

        const url = `http://sefdb02.qut.edu.au:3001/user/register`;

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
                alert(data.message)
                if(!data.error) {
                    navigate('/login')
                }
            })
    };

    return (
        <div className="login-form-container container main">
            <form onSubmit={(e) => {register(e)}} className="user-form">
                <h2>Register</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" id="email" className="form-control"></input>
                </div>

                <div className="mb-3">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" className="form-control"></input>
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" className="form-control"></input>
                </div>

                <Button type="submit" color="warning" >Register</Button>
            </form>
        </div >
    );
}

export default Register;
