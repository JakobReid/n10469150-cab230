import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, Table, Modal, ModalBody, ModalHeader, ModalFooter, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { Map, Marker, Overlay } from "pigeon-maps";
import { osm } from 'pigeon-maps/providers';
import { FaFileAlt } from 'react-icons/fa';
import { Chart } from "react-chartjs-2";

function VolcanoDetails( {currentUser} ) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [popover, setPopover] = useState(<p></p>);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [popoverTarget, setPopoverTarget] = useState("root");
    const [map, setMap] = useState(
        <p>Loading</p>
    );
    const [modalBody, setModalBody] = useState(
        <p>run a report bruh</p>
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
    console.log(currentUser);

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
            .then(data => { setVolcano(data); setIsLoaded(true) })
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
                    <Marker
                        width={50}
                        color={"red"}
                        anchor={[parseFloat(volcano.latitude), parseFloat(volcano.longitude)]}
                        onClick={() => {
                            setPopover(

                            )
                        }}
                    />
                    <Overlay
                        anchor={[parseFloat(volcano.latitude) + 0.0045412, parseFloat(volcano.longitude) - 0.00214579]}>
                        {/* <Popover placement="bottom" isOpen={popoverOpen} target="pigeon-click-block" toggle={togglePopover}>
                            <PopoverHeader>Popover Title</PopoverHeader>
                            <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                        </Popover> */}
                    </Overlay>
                </Map>
            )
            setMapLoaded(true)
        }
    }, [isLoaded])

    return (
        <div className="container main">
            <div className="row">
                <h1>Volcano Details</h1>
            </div>
            <div className="row">

                <div className="col-lg">
                    <Table
                        id="details-card"
                        className="table"
                    >
                        <tbody>
                            {Object.entries(volcano).map(([key, value]) => {
                                return (
                                    <tr key={`tr-${key}`}>
                                        <td key={`${key}-name`} className="property-name">{key}</td>
                                        <td key={`${key}-value`} className="property-value">{value}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className="col-lg map-container">
                    {map}
                </div>
            </div>
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
                onClick={() => setModalOpen(true)}
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
                        onClick={() => setModalBody("bruh")}
                    >
                        Run Report
                    </Button>
                    <Button onClick={() => setModalOpen(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default VolcanoDetails;