import './style.css';
import Button from "../../common/Button";
import Error from "../../common/Error";

import StepWizard from "react-step-wizard";


import {postToApi} from './api'

import {useState} from 'react';

import PersonalInfo from './PersonalInfo';
import LocationInfo from './LocationInfo';
import FinancialInfo from './FinancialInfo';
import Nav from './Nav';


const Onboarding = () => {

    const [error, setError] = useState('');
    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData);

        postToApi(values).then((response) => {

            //navigate to dashboard or goals page

        }).catch((error) => {
            setError(error.message)
        });

    };

    return <div className="container" id="onboarding">
        <div className="row">
            <h1>Onboarding</h1>
            <form className="g-3" onSubmit={handleSubmit}>
                <StepWizard nav={<Nav/>}>

                    <PersonalInfo/>
                    <LocationInfo/>
                    <FinancialInfo/>

                </StepWizard>
            </form>

        </div>
    </div>
};

export default Onboarding;