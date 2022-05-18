import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, Table, Modal, ModalBody, ModalHeader, ModalFooter, Popover, PopoverHeader, PopoverBody, Tooltip } from "reactstrap";
import { Map, Marker, Overlay } from "pigeon-maps";
import { osm } from 'pigeon-maps/providers';
import { FaFileAlt } from 'react-icons/fa';
import BarChart from "./BarChart";
import volcanoSvg from "../assets/volcano.svg";

function VolcanoDetails({ currentUser }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [populationData, setPopulationData] = useState("root");
    const [map, setMap] = useState(
        <p>Loading</p>
    );
    const [modalBody, setModalBody] = useState(
        <p>Click 'Run Report' to view population density data</p>
    )
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

    const getLabel = (prop_name) => {
        let label = prop_name.replace(prop_name[0], prop_name[0].toUpperCase());
        let underScoreIndex = label.indexOf('_');
        if (underScoreIndex >= 0) {
            label = label.replace(prop_name[underScoreIndex + 1], prop_name[underScoreIndex + 1].toUpperCase());
        }
        label = label.replace('_', ' ');
        return (label)
    }

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
                    <Table
                        id="details-card"
                        className="table"
                    >
                        <tbody>
                            {Object.entries(volcano).map(([key, value]) => {
                                return (
                                    <tr key={`tr-${key}`}>
                                        <td key={`${key}-name`} className="property-name">{getLabel(key)}</td>
                                        <td key={`${key}-value`} className="property-value">{value}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Button
                        color="warning"
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
                    <Modal
                        id="report-modal"
                        isOpen={modalOpen}
                    >
                        <ModalHeader>
                            Reports
                        </ModalHeader>

                        <ModalBody>
                            {modalBody}
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                color="success"
                                onClick={() => setModalBody(<BarChart data={populationData} />)}
                            >
                                Run Report
                            </Button>
                            <Button onClick={() => setModalOpen(false)}>
                                Close
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div className="col-lg-8 map-container">
                    {map}
                </div>
        </div>
    );
}

export default VolcanoDetails;