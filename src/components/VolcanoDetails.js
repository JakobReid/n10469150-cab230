import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import { Map, Marker } from "pigeon-maps";
import { osm } from 'pigeon-maps/providers'

function VolcanoDetails() {
    const [volcano, setVolcano] = useState({
        name: '',
        country: '',
        region: '',
        subregion: '',
        last_eruption: '',
        summit: '',
        elevation: '',
        latitude: '',
        longitude: '',
    });
    const [map, setMap] = useState(
        <p>Loading</p>
    );
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchParams] = useSearchParams();

    const volcanoId = searchParams.get("id");

    useEffect(() => {
        fetch(`http://sefdb02.qut.edu.au:3001/volcano/${volcanoId}`)
            .then(res => res.json())
            .then(data => {setVolcano(data); setIsLoaded(true)})
    }, [])

    useEffect(() => {
        setMap(
            <Map defaultCenter={[parseFloat(volcano.latitude), parseFloat(volcano.longitude)]} >
                <Marker anchor={[parseFloat(volcano.latitude), parseFloat(volcano.longitude)]} />
            </Map>
        )
    }, [isLoaded])
    

    return (
        <div className="container main">
            <h1>{volcano.name}</h1>
            <div className="row">
                <div className="col">
                    <h1>Volcano Details</h1>
                    <Table
                        className="details-card table"
                        bordered={true}
                    >
                        <tbody>
                            {Object.entries(volcano).map(([key, value]) => {
                                return (
                                    <tr>
                                        <td>{key}</td>
                                        <td>{value}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className="col">
                    <Button onClick={() => {setIsLoaded(!isLoaded)}}>reload</Button>
                    {map}
                </div>
            </div>
        </div>
    );
}

export default VolcanoDetails;