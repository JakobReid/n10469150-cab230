import { Link } from "react-router-dom";
import GitHub from "../assets/github.svg";

function Footer() {
    const getCurrentYear = ()=> {
        let todayDate = new Date();
        return(
            `${todayDate.getFullYear()}`
            );
    };
    // 

    return(
        <footer className="fixed-bottom">
            <ul className="nav justify-content-center border-bottom">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/about">About</Link>
                <a className="nav-link" href="https://github.com/JakobReid/n10469150-cab230" target="_blank">
                    <img src={GitHub} alt="GitHub" height={40} style={{paddingBottom: 10}}/>
                </a>
            </ul>
            <p className="text-center" style={{ color: "white", padding: "10px" }}>&copy; Jakob Reid {getCurrentYear()}</p>
        </footer>
    );
}

export default Footer;