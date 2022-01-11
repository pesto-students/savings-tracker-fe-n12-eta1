import './style.css';
import Modal from 'react-bootstrap/Modal';
import StepWizard from "react-step-wizard";
import {useNavigate} from "react-router-dom";


import {postToApi} from './api'

import {useState} from 'react';

import PersonalInfo from './PersonalInfo';
import LocationInfo from './LocationInfo';
import FinancialInfo from './FinancialInfo';
import Nav from './Nav';
import Error from "../../common/Error";


const Onboarding = () => {

    const navigate = useNavigate();

    const [error, setError] = useState('');
    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData);

        postToApi(values).then((response) => {

            //navigate to dashboard or goals page
            // navigate('/dashboard');

        }).catch((error) => {
            setError(error.message)
        });

    };

    return (
        <div className="container" id="onboarding">
            <h1>Onboarding</h1>

            <form className="g-3" onSubmit={handleSubmit}>
                <StepWizard nav={<Nav/>}>

                    <PersonalInfo/>
                    <LocationInfo/>
                    <FinancialInfo/>

                </StepWizard>
                <Error error={error}/>
            </form>

        </div>

    );
};

export default Onboarding;