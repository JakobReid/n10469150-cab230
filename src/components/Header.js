import { BrowserRouter, Link } from "react-router-dom";
import volcano from "../assets/volcano.svg";

function Header() {
    return (
        <header className="container-fluid" id="title-header">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src={volcano} height="60"/><span>Volcanoes Around The World</span></Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/list"><span>List</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register"><span>Register</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login"><span>Login</span></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;