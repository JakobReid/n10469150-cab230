import {useState, useEffect} from "react";

function CountrySelect({countries, setCountry}) {


    return (
        <div>
            <label htmlFor="country-select">Please select a country: </label>

            <select
                id="country-select"
                onChange={(e) => setCountry(e.target.value)}
            >
                {countries.map((country) =>
                    <option key={country} value={country}
                    >
                        {country}
                    </option>)}
            </select>
        </div>
    )
}

export default CountrySelect;