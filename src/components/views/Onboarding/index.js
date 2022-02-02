import './style.css';
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
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData);

        setLoading(true);

        postToApi(values).then((response) => {

            navigate('/dashboard');
            setLoading(false);

        }).catch((error) => {
            setError(error.message);
            setLoading(false);
        });

    };

    return (
        <div className="container" id="onboarding">
            <h1>Onboarding</h1>

            <form className="g-3" onSubmit={handleSubmit}>
                <StepWizard nav={<Nav/>}>

                    <PersonalInfo/>
                    <LocationInfo/>
                    <FinancialInfo loading={loading}/>

                </StepWizard>
                <Error error={error}/>
                <p className="text-black-50 mt-3"><span className="text-danger">*</span> required field</p>

            </form>

        </div>

    );
};

export default Onboarding;