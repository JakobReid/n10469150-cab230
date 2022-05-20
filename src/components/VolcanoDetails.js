import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, Table,  Popover, PopoverHeader, PopoverBody, Tooltip } from "reactstrap";
import { Map, Marker, Overlay } from "pigeon-maps";
import { osm } from 'pigeon-maps/providers';
import { FaFileAlt } from 'react-icons/fa';
import volcanoSvg from "../assets/volcano.svg";
import ChartModal from "./ChartModal";
import DetailsCard from "./DetailsCard";

function VolcanoDetails({ currentUser }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [populationData, setPopulationData] = useState("root");
    const [map, setMap] = useState(
        <p>Loading</p>
    );

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

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const volcanoId = searchParams.get("id");

    useEffect(() => {
        const url = `http://sefdb02.qut.edu.au:3001/volcano/${volcanoId}`;
        let headers = {

        };
        if (typeof currentUser !== 'undefined' && currentUser !== null) {
            const token = sessionStorage.getItem("token");
            headers = {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }
        fetch(url, { headers })
            .then(res => res.json())
            .then(data => {
                setVolcano(data);
                setIsLoaded(true)
                setPopulationData([
                    {
                        distance: "5km",
                        population: data.population_5km
                    },
                    {
                        distance: "10km",
                        population: data.population_10km
                    },
                    {
                        distance: "30km",
                        population: data.population_30km
                    },
                    {
                        distance: "100km",
                        population: data.population_100km
                    },
                ])
            })
    }, [])

    useEffect(() => {
        if (isLoaded === true) {
            setMap(
                <Map
                    provider={osm}
                    width=""
                    defaultCenter={[parseFloat(volcano.latitude), parseFloat(volcano.longitude)]}
                    defaultZoom={4}
                >
                    <Overlay
                        anchor={[parseFloat(volcano.latitude) + 0.0045412, parseFloat(volcano.longitude) - 0.00214579]}
                        offset={[30, 60]}
                    >
                        <img id="volcano-marker" src={volcanoSvg} width="60" height="60" />

                    </Overlay>
                    <Popover target="volcano-marker"></Popover>
                </Map>
            )
        }
    }, [isLoaded])

    return (
        <div className="main d-flex align-items-stretch">
            <div className="col-lg align-self-center details-card-container">
                <h1 className="content-title">Volcano Details</h1>
                <DetailsCard id="details-card" volcano={volcano}/>

                <Button color="warning"
                    size="small"
                    className="jajob-buttons"
                    onClick={() => { navigate("/") }}
                >
                    &#x2190; Back
                </Button>

                <Button
                    color="success"
                    size="small"
                    className="jajob-buttons"
                    onClick={() => {
                        if (typeof currentUser !== 'undefined' && currentUser !== null) {
                            setModalOpen(true)
                        }
                        else {
                            alert("Error: You must be logged in to access reporting");
                        }
                    }}
                >
                    <FaFileAlt /> Reports
                </Button>

                <ChartModal modalOpen={modalOpen} setModalOpen={setModalOpen} populationData={populationData} />
            </div>
            <div className="col-lg-8 map-container">
                {map}
            </div>
        </div>
    );
}

export default VolcanoDetails;