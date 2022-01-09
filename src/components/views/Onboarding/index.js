import './style.css';
import Button from "../../common/Button";
import Error from "../../common/Error";

import {postToApi} from './api'

import {useState} from 'react';

import AuthContext from '../../../AuthContext';


const Onboarding = () => {

    const [error, setError] = useState('');
    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData);

        postToApi(values).then((response) => {
            console.log(response);
            //navigate to dashboard or goals page

        }).catch((error) => {
            setError(error.message)
        });

    };

    return <div className="container" id="onboarding">
        <div className="row">
            <h1>Onboarding</h1>


            <div className="col">
                <form className="g-3" onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-3"><label htmlFor="currency"
                                                         className="form-label">Currency</label>
                            <select className="form-control" name="currency" id="currency">
                                <option value="INR">₹ (INR)</option>
                                <option value="USD">$ (USD)</option>
                                <option value="EUR">€ (EURO)</option>
                            </select></div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3"><label htmlFor="monthly-income" className="form-label">Monthly
                            Income</label>
                            <input type="number" className="form-control" id="monthly-income"
                                   name="monthly-income"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3"><label htmlFor="monthly-expenses" className="form-label">Monthly
                            Expenses</label>
                            <input type="number" className="form-control" id="monthly-expenses"
                                   name="monthly-expenses"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-3">
                            <Button type="submit" text="Proceed" extraClass="primary btn-round text-white"/>
                        </div>
                    </div>
                    {error && <Error message={error}/>}
                </form>
            </div>
        </div>
    </div>
};

export default Onboarding;