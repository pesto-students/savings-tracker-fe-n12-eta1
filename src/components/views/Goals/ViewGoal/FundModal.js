import Modal from 'react-bootstrap/Modal'
import Button from "../../../common/Button";
import {useEffect, useState} from "react";
import {addFund, updateFund} from "../../Funds/api";
import Loader from "../../../common/Loader";
import Error from "../../../common/Error";
import {formatDateSimple} from "../../../common/utils";
import {validateFundFormFields} from "./utils";

const FundModal = ({show, handleClose, fund, goalId, onSubmitSuccess}) => {

    const [serverErrors, setServerErrors] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [frequency, setFrequency] = useState(fund?.frequency || 'Recurring');

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        form.setAttribute('data-submit-attempted', '1');

        const formErrors = validateFundFormFields(form, true);

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setLoading(true);

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        if (fund) {
            updateFund(goalId, fund._id, data).then(handleResponse).catch(handleServerError)
        }
        else {
            addFund(data, goalId).then(handleResponse).catch(handleServerError)
        }
    };

    const handleChange = (e) => {

        e.target.setAttribute('data-touched', '1');
        setErrors(validateFundFormFields(e.target.form))
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

    useEffect(() => {
        //setFrequency(fund?.frequency || 'Recurring');
    }, [fund]);


    return <Modal size="lg" show={show} onHide={handleClose} dialogClassName="modal-90w">
        <Modal.Header closeButton>
            <Modal.Title>{fund ? 'Edit' : 'Add'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form autoComplete="off" onSubmit={handleSubmit} className="row">
                <input type="hidden" name="goal_id" value=""/>
                <div className="col-md-6 mb-sm-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input onChange={handleChange} type="number" name="amount" min="1" className="form-control"
                           id="amount"
                           defaultValue={fund?.amount}
                           placeholder=""/>
                    {errors.amount && <Error message={errors.amount}/>}

                </div>
                <div className="col-md-6 mb-sm-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input name="description" className="form-control" defaultValue={fund?.description}
                           id="description"/>

                </div>
                <div>
                    <div className="d-flex">
                        <Button disabled={loading || Object.keys(errors).length > 0} type="submit" text="Save"/>
                        <Loader
                            visible={loading}/>

                    </div>
                    {serverErrors && <Error message={serverErrors}/>}
                </div>
            </form>
        </Modal.Body>
    </Modal>
}


export default FundModal;