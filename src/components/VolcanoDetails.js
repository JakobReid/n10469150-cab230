import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

function VolcanoDetails() {
    const [countryDetails, setCountryDetails] = useState([]);
    const [searchParams] = useSearchParams();
    
    const volcanoId = searchParams.get("id");

    const columns = [
        { headerName: "Name", field: "name"},
        { headerName: "Country", field: "country"},
        { headerName: "Region", field: "region"},
        { headerName: "Sub-Region", field: "subregion"},
        { headerName: "Last Eruption", field: "last_eruption"},
        { headerName: "Summit", field: "summit"},
        { headerName: "Elevation", field: "elevation"},
        { headerName: "Latitude", field: "latitude"},
        { headerName: "Longitude", field: "longitude"},
    ]

    useEffect(() => {
        fetch(`http://sefdb02.qut.edu.au:3001/volcano/${volcanoId}`)
            .then(res => res.json())
            .then(data => setCountryDetails(data));
    }, [])

    return (
        <div>
            <h1>Volcano Details</h1>
            <div
                className="ag-theme-balham volcano-table"
                style={{
                    height: "400px",
                    maxWidth: "1000px",
                    margin: "auto"
                }}
            >
                <AgGridReact
                    columnDefs={columns}
                    rowData={countryDetails}
                />
            </div>
        </div>
    );
}

export default VolcanoDetails;