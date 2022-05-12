import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table } from "reactstrap";

function VolcanoDetails() {
    const [countryDetails, setCountryDetails] = useState([]);
    const [searchParams] = useSearchParams();

    const volcanoId = searchParams.get("id");

    useEffect(() => {
        fetch(`http://sefdb02.qut.edu.au:3001/volcano/${volcanoId}`)
            .then(res => res.json())
            .then(data => setCountryDetails(data));
    }, [])

    return (
        <div>
            <h1>Volcano Details</h1>
            <Table
                className="details-card"
                bordered={true}
            >
                {Object.entries(countryDetails).map(([key, value]) => {
                    return (
                        <tr>
                            <td>{key}</td>
                            <td>{value}</td>
                        </tr>
                    )
                })}
            </Table>
        </div>
    );
}

export default VolcanoDetails;