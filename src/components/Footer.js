import { Link } from "react-router-dom";

function Footer() {
    const getCurrentYear = ()=> {
        let todayDate = new Date();
        return(
            `${todayDate.getFullYear()}`
            );
    };

    return(
        <footer className="fixed-bottom">
            <ul className="nav justify-content-center border-bottom">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/about">About</Link>
            </ul>
            <p className="text-center" style={{ color: "white", padding: "10px" }}>&copy; Jakob Reid {getCurrentYear()}</p>
        </footer>
    );
}

export default Footer;