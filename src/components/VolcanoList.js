import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import CountrySelect from "./CountrySelect";

function VolcanoList() {
    const [country, setCountry] = useState('Algeria');
    const [distance, setDistance] = useState('Any Distance');
    const [url, setUrl] = useState(`http://sefdb02.qut.edu.au:3001/volcanoes?country=${country}`);
    const [rowData, setRowData] = useState([]);
    const navigate = useNavigate();

    const columns = [
        { headerName: "Volcano ID", field: "id" },
        { headerName: "Name", field: "name" },
        { headerName: "Country", field: "country" },
        { headerName: "Region", field: "region" },
        { headerName: "Sub-Region", field: "subregion" }
    ];

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(volcanoes => setRowData(volcanoes));
    }, [url]);

    useEffect(() => {
        if(distance != "Any Distance") {
            setUrl(`http://sefdb02.qut.edu.au:3001/volcanoes?country=${country}` + `&populatedWithin=${distance}`)
        }
        else {
           setUrl(`http://sefdb02.qut.edu.au:3001/volcanoes?country=${country}`)
        }
    }, [country, distance])


    return (
        <div className="container">
            <h1>Volcano List</h1>
            <CountrySelect setCountry={setCountry} setDistance={setDistance}/>

            <div
                className="ag-theme-balham volcano-table"
                style={{
                    height: "400px",
                }}
            >
                <AgGridReact
                    columnDefs={columns}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={10}
                    onRowClicked={
                        row=> navigate(`/volcanoDetails?id=${row.data.id}`)}
                />
            </div>
        </div>
    );
}

export default VolcanoList;