import { BrowserRouter, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import volcano from "../assets/volcano.svg";

function Header({ currentUser, setCurrentUser }) {
    const isLoggedIn = (currentUser === null ? false : true);
    const navigate = useNavigate();
    const logout = () => {
        sessionStorage.clear();
        setCurrentUser(null);
        navigate("/login");
    }

    return (
        <header className="container-fluid" id="title-header">
            <nav className="navbar navbar-expand-lg bg-dark fixed-top">
                <div className="container-fluid">
                    <Link id="navbar-title" className="navbar-brand" to="/"><img src={volcano} height="60" /><span>Volcanoes Around The World</span></Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to={isLoggedIn ? '/' : "/login"}><span>{isLoggedIn ? `logged in as ${currentUser}` : "Login"}</span></Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={logout}><span>{isLoggedIn ? "Logout" : ""}</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;