import { BrowserRouter, Link } from "react-router-dom";

function Header() {
    return (
        <header className="container" id="title-header">
            <h1 className="title">Volcanoes Around The World</h1>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link className="nav-link" to="/list">List</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
                {/* <nav className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/list">List</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </nav> */}
        </header>
    );
}

export default Header;