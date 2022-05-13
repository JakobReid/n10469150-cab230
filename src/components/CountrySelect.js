import { useState, useEffect } from "react";
import { Label } from "reactstrap";

function CountrySelect({ setCountryParam, setDistance }) {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch("http://sefdb02.qut.edu.au:3001/countries")
            .then(res => res.json())
            .then(data => setCountries(data));
    }, []);

    const distances = [
        "Any Distance",
        "5km",
        "10km",
        "30km",
        "100km",
    ]

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <Label htmlFor="country-select">Country: </Label>
                </div>
                <div className="col">
                    <select
                        id="country-select"
                        onChange={(e) => setCountryParam(e.target.value)}
                    >
                        {countries.map((country) =>
                            <option key={country} value={country}
                            >
                                {country}
                            </option>)}
                    </select>
                </div>
                <div className="col">
                    <Label htmlFor="distance-select">Populated Within: </Label>
                </div>
                <div className="col">
                    <select
                        id="distance-select"
                        onChange={(e) => setDistance(e.target.value)}
                    >
                        {distances.map((distance) =>
                            <option key={distance} value={distance}
                            >
                                {distance}
                            </option>)}
                    </select>
                </div>
                <div className="col"></div>
                <div className="col"></div>
            </div>
        </div>
    )
}

export default CountrySelect;