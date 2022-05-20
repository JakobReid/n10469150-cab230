import { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import BarChart from "./BarChart";

function ChartModal(props) {

    const [modalBody, setModalBody] = useState(
        <p>Click 'Run Report' to view population density data</p>
    );

    return (
        <Modal
            id="report-modal"
            isOpen={props.modalOpen}
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
                    onClick={() => setModalBody(<BarChart data={props.populationData} />)}
                >
                    Run Report
                </Button>
                <Button onClick={() => props.setModalOpen(false)}>
                    Close
                </Button>
            </ModalFooter>
        </Modal> 
    );
}

export default ChartModal;