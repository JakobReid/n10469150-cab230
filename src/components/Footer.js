function Footer() {
    const getCurrentYear = ()=> {
        let todayDate = new Date();
        return(
            `${todayDate.getFullYear()}`
            );
    };

    return(
        <footer>
            <ul className="nav justify-content-center border-bottom">
                <li className="nav-item"><a className="nav-link">Home</a></li>
                <li className="nav-item"><a className="nav-link">Volcano List</a> </li>
                <li className="nav-item"><a className="nav-link">About</a></li>
            </ul>
            <p className="text-center" style={{ color: "white", padding: "10px" }}>&copy; Copyright Jakob Reid {getCurrentYear()}</p>
        </footer>
    );
}

export default Footer;