import Button from "../common/Button";
import Modal from 'react-bootstrap/Modal';

function DummyCredentialsModal({show, setShow}) {

    const hide = () => {
        setShow(false);
    };

    return <Modal show={show} onHide={hide}>
        <Modal.Header closeButton>
            <Modal.Title>Dummy Credentials</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ul>
                <li>Phone number: <b>+91 99999 99999</b></li>
                <li>OTP: <b>111111</b></li>
            </ul>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={hide} text="Close"/>

        </Modal.Footer>
    </Modal>
}

export default DummyCredentialsModal