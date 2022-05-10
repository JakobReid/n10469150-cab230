import { BrowserRouter, Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <h1>Volcanoes Around The World</h1>
                <nav className="nav-bar">
                    <Link to="/">Home</Link>
                    <Link to="/list">List</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </nav>
        </header>
    );
}

export default Header;