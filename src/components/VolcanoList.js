import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import CountrySelect from "./CountrySelect";

function VolcanoList() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('Algeria');
    const [rowData, setRowData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://sefdb02.qut.edu.au:3001/countries")
            .then(res => res.json())
            .then(data => setCountries(data));
    }, []);

    const columns = [
        { headerName: "Volcano ID", field: "id" },
        { headerName: "Name", field: "name" },
        { headerName: "Country", field: "country" },
        { headerName: "Region", field: "region" },
        { headerName: "Sub-Region", field: "subregion" }
    ];

    useEffect(() => {
        fetch(`http://sefdb02.qut.edu.au:3001/volcanoes?country=${country}`)
            .then((res) => res.json())
            .then((data) => data)
            .then((volcanoes) => setRowData(volcanoes));
    }, [country]);


    return (
        <div>
            <h1>Volcano List</h1>
            <CountrySelect countries={countries} setCountry={setCountry}/>

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
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={10}
                    onRowClicked={
                        row=> navigate(`/volcanoDetails?name=${row.data.name}`)}
                />
            </div>
        </div>
    );
}

export default VolcanoList;