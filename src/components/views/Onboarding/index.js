import './style.css';
import Modal from 'react-bootstrap/Modal';
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

    return (

        <Modal
            size="lg"
            show={true}
            aria-labelledby="signin-modal-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="signin-modal-title">
                   On Boarding
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="container" id="onboarding">
                <div className="row">
                    <form className="g-3" onSubmit={handleSubmit}>
                        <StepWizard nav={<Nav/>}>

                            <PersonalInfo/>
                            <LocationInfo/>
                            <FinancialInfo/>

                        </StepWizard>
                    </form>
                </div>
            </div>
            </Modal.Body>
        </Modal>
        
    );
};

export default Onboarding;