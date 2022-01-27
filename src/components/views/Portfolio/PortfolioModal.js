import Modal from 'react-bootstrap/Modal'
import Button from "../../common/Button";
import {useEffect, useState} from "react";
import {addPortfolio, updatePortfolio} from "./api";
import Loader from "../../common/Loader";
import Error from "../../common/Error";
import {formatDateYYYYMMDD} from "../../common/utils";
import {validatePortfolioFormFields} from "./utils";


const PortfolioModal = ({show, handleClose, portfolio, onSubmitSuccess}) => {

    const [serverErrors, setServerErrors] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [frequency, setFrequency] = useState(portfolio?.frequency || 'Recurring');

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        setServerErrors([]);


        form.setAttribute('data-submit-attempted', '1');

        const formErrors = validatePortfolioFormFields(form, true);

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setLoading(true);

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        if (portfolio) {
            updatePortfolio(portfolio._id, data).then(handleResponse).catch(handleServerError)
        }
        else {
            addPortfolio(data).then(handleResponse).catch(handleServerError)
        }
    };

    const handleChange = (e) => {

        e.target.setAttribute('data-touched', '1');
        setErrors(validatePortfolioFormFields(e.target.form))
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

    const handleFrequencyChange = (e) => {
        setFrequency(e.target.value);
    };

    useEffect(() => {
        setFrequency(portfolio?.frequency || 'Recurring');
    }, [portfolio]);


    const renderFrequencyFields = () => {
        return <>
            <div className="col-md-6 mb-sm-3">
                <label htmlFor="portfolio_frequency_type" className="form-label">Frequency Type <span className="text-danger">*</span></label>
                <select name="frequency_type" className="form-control" defaultValue={portfolio?.frequency_type}
                        id="portfolio_frequency_type">
                    <option value="Day">Day</option>
                    <option value="Week">Week</option>
                    <option value="Month">Month</option>
                </select>
            </div>
            <div className="col-md-6 mb-sm-3">
                <label htmlFor="portfolio_frequency_unit" className="form-label">Frequency Unit <span className="text-danger">*</span></label>
                <input onChange={handleChange} type="number" name="frequency_unit" min="1" className="form-control"
                       id="portfolio_frequency_unit"
                       defaultValue={portfolio?.frequency_unit}
                       placeholder=""/>
                {errors.frequency_unit && <Error message={errors.frequency_unit}/>}
            </div>
        </>
    };


    return <Modal size="lg" show={show} onHide={handleClose} dialogClassName="modal-90w">
        <Modal.Header closeButton>
            <Modal.Title>{portfolio ? 'Edit' : 'Add'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleSubmit} className="row">
                <div className="col-md-6 mb-sm-3">
                    <div>
                        <label htmlFor="" className="form-label">Type <span className="text-danger">*</span></label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio"
                               defaultChecked={!portfolio || portfolio?.type === 'Income'} name="type"
                               id="portfolio-type-income"
                               value="Income"/>
                        <label className="form-check-label" htmlFor="portfolio-type-income">Income</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="type" id="portfolio-type-expenses"
                               value="Expenses" defaultChecked={portfolio?.type === 'Expenses'}/>
                        <label className="form-check-label" htmlFor="portfolio-type-expenses">Expenses</label>
                    </div>
                </div>
                <div className="col-md-6 mb-sm-3">
                    <div>
                        <label htmlFor="" className="form-label">Frequency <span className="text-danger">*</span></label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input onClick={handleFrequencyChange} className="form-check-input" type="radio"
                               name="frequency"
                               id="portfolio-recurring"
                               value="Recurring"
                               defaultChecked={!portfolio || portfolio?.frequency === 'Recurring'}/>
                        <label className="form-check-label" htmlFor="portfolio-recurring">Recurring</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input onClick={handleFrequencyChange} className="form-check-input" type="radio"
                               name="frequency" id="portfolio-one-time"
                               value="One Time" defaultChecked={portfolio?.frequency === 'One Time'}/>
                        <label className="form-check-label" htmlFor="portfolio-one-time">One Time</label>
                    </div>
                </div>

                {frequency === 'Recurring' && renderFrequencyFields()}

                <div className="col-md-6 mb-sm-3">
                    <label htmlFor="portfolio_amount" className="form-label">Amount <span className="text-danger">*</span></label>
                    <input onChange={handleChange} type="number" name="amount" min="1" className="form-control"
                           id="portfolio_amount"
                           defaultValue={portfolio?.amount}
                           placeholder=""/>
                    {errors.amount && <Error message={errors.amount}/>}

                </div>
                <div className="col-md-6 mb-sm-3">
                    <label htmlFor="portfolio_description" className="form-label">Description <span className="text-danger">*</span></label>
                    <input onChange={handleChange} type="text" className="form-control"
                           id="portfolio_description" name="description"
                           defaultValue={portfolio?.description}/>
                    {errors.description && <Error message={errors.description}/>}
                </div>


                <div className="col-md-6 mb-sm-3">
                    <label htmlFor="portfolio_start_date" className="form-label">Start Date <span className="text-danger">*</span></label>
                    <input onChange={handleChange} type="date" name="start_date" className="form-control"
                           id="portfolio_start_date"
                           defaultValue={formatDateYYYYMMDD(portfolio?.start_date)}/>
                    {errors.start_date && <Error message={errors.start_date}/>}

                </div>
                <div className="col-md-6 mb-sm-3">
                    <label htmlFor="portfolio_end_date" className="form-label">End Date</label>
                    <input onChange={handleChange} disabled={frequency === 'One Time'} type="date"
                           className="form-control"
                           id="portfolio_end_date" name="end_date"
                           defaultValue={formatDateYYYYMMDD(portfolio?.end_date)}/>
                    {errors.end_date && <Error message={errors.end_date}/>}

                </div>
                <div>
                    <div className="d-flex">
                        <Button disabled={loading || Object.keys(errors).length > 0} type="submit" text="Save"/>
                        <Loader
                            visible={loading}/>

                    </div>
                    <p className="text-black-50 mt-3"><span className="text-danger">*</span> required field</p>
                    {serverErrors && <Error message={serverErrors}/>}
                </div>
            </form>
        </Modal.Body>
    </Modal>
}


export default PortfolioModal;