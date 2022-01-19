import Modal from 'react-bootstrap/Modal'
import Button from "../../common/Button";
import {useEffect, useState} from "react";
import {addPortfolio, updatePortfolio} from "./api";
import Loader from "../../common/Loader";
import Error from "../../common/Error";
import {formatDateSimple} from "../../common/utils";


const PortfolioModal = ({show, handleClose, portfolio, onSubmitSuccess}) => {

    const [serverErrors, setServerErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [frequency, setFrequency] = useState('Recurring');

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        if (portfolio) {
            updatePortfolio(portfolio._id, data).then(handleResponse).catch(handleServerError)
        }
        else {
            addPortfolio(data).then(handleResponse).catch(handleServerError)
        }
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


    return <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
        <Modal.Header closeButton>
            <Modal.Title>{portfolio ? 'Edit' : 'Add'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleSubmit} className="row">
                <div className="col">
                    <div className="mb-3">
                        <div>
                            <label htmlFor="" className="form-label">Type</label>
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
                    <div className="mb-3">
                        <div>
                            <label htmlFor="" className="form-label">Frequency</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input onClick={handleFrequencyChange} className="form-check-input" type="radio"
                                   name="frequency"
                                   id="portfolio-recurring"
                                   value="Recurring" defaultChecked={frequency === 'Recurring'}/>
                            <label className="form-check-label" htmlFor="portfolio-recurring">Recurring</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input onClick={handleFrequencyChange} className="form-check-input" type="radio"
                                   name="frequency" id="portfolio-one-time"
                                   value="One Time" defaultChecked={frequency === 'One Time'}/>
                            <label className="form-check-label" htmlFor="portfolio-one-time">One Time</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="portfolio_amount" className="form-label">Amount</label>
                        <input required type="number" name="amount" min="1" className="form-control" id="portfolio_amount"
                               defaultValue={portfolio?.amount}
                               placeholder=""/>
                    </div>
                    <div className="mb-3">
                        <label  htmlFor="portfolio_start_date" className="form-label">Start Date</label>
                        <input required type="date" name="start_date" className="form-control" id="portfolio_start_date"
                               defaultValue={formatDateSimple(portfolio?.start_date)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="portfolio_end_date" className="form-label">End Date</label>
                        <input disabled={frequency === 'One Time'} type="date" className="form-control"
                               id="portfolio_end_date" name="end_date"
                               defaultValue={formatDateSimple(portfolio?.end_date)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="portfolio_description" className="form-label">Description</label>
                        <input required type="text" className="form-control"
                               id="portfolio_description" name="description"
                               defaultValue={portfolio?.description}
                        />
                    </div>
                    <div className="d-flex">
                        <Button disabled={loading} type="submit" text="Save"/>
                        <Loader
                            visible={loading}/>

                    </div>
                    {serverErrors && <Error message={serverErrors}/>}
                </div>
            </form>
        </Modal.Body>
    </Modal>
}


export default PortfolioModal;