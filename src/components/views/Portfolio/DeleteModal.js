import {useEffect, useState} from "react";
import {deletePortfolio} from "./api";
import Modal from "react-bootstrap/Modal";
import Button from "../../common/Button";
import Loader from "../../common/Loader";
import Error from "../../common/Error";

const DeleteModal = ({show, handleClose, portfolio, onSubmitSuccess}) => {

    const [serverErrors, setServerErrors] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        deletePortfolio(portfolio._id).then(handleResponse).catch(handleServerError)
    };
    const handleResponse = (response) => {
        setLoading(false);
        if (onSubmitSuccess) {
            onSubmitSuccess();
        }
        handleClose();

    };


    const handleServerError = (error) => {
        const errors = error.response?.data?.errors || [error.message];
        setServerErrors(errors);
        setLoading(false);
    };


    return <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
        <Modal.Header closeButton>
            <Modal.Title>Delete Portfolio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleSubmit} className="row">
                <div className="col">
                    <p>Are you sure you want to delete this item?</p>
                    <div className="d-flex">
                        <Button disabled={loading} type="submit" text="Delete"/>
                        <Loader
                            visible={loading}/>
                        {serverErrors && <Error message={serverErrors}/>}
                    </div>
                </div>
            </form>
        </Modal.Body>
    </Modal>
};

export default DeleteModal;