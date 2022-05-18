import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import CountrySelect from "./CountrySelect";

function VolcanoList() {
    const [country, setCountry] = useState('Algeria');
    const [distance, setDistance] = useState('Any Distance');
    const [url, setUrl] = useState(`http://sefdb02.qut.edu.au:3001/volcanoes?country=${country}`);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState('');
    const [rowData, setRowData] = useState([]);
    const navigate = useNavigate();

    const columns = [
        { headerName: "ID", field: "id", sortable: true, filter: true, flex: 1 },
        { headerName: "Name", field: "name", sortable: true, filter: true, flex: 2 },
        { headerName: "Country", field: "country", sortable: true, filter: true, flex: 2 },
        { headerName: "Region", field: "region", sortable: true, filter: true, flex: 2 },
        { headerName: "Sub-Region", field: "subregion", sortable: true, filter: true, flex: 2 }
    ];

    useEffect(() => {
        if (distance != "Any Distance") {
            setUrl(`http://sefdb02.qut.edu.au:3001/volcanoes?country=${country}` + `&populatedWithin=${distance}`)
        }
        else {
            setUrl(`http://sefdb02.qut.edu.au:3001/volcanoes?country=${country}`)
        }
    }, [country, distance])

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                setIsLoaded(true)
                setRowData(data)
            })
            .catch(error => alert(error));
    }, [url]);

    return (
        <div className="container main">
            <h1 className="content-title">Volcano List</h1>
            
            <CountrySelect setCountry={setCountry} setDistance={setDistance}/>

            <div
                className="ag-theme-alpine-dark volcano-table"
                style={{
                    margin: "auto",
                    height: "523px"
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