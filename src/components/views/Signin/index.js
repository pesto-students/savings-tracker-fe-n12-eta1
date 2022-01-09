import {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from '../../common/Button/index.js';
import {omit} from 'lodash'
import Error from '../../common/Error/index.js';

import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {auth} from '../../../firebase';

import './index.css';

let recaptchaVerifier, authConfirmationResult;

const SignIn = ({show, setShow}) => {


    useEffect(() => {

        recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {'size': 'invisible'}, auth);


    }, []);


    const [error, setError] = useState();

    const [step, setStep] = useState(1);


    const sendOTP = (e) => {
        e.preventDefault();
        setError('');

        const form = e.target.form;
        const mobileNumber = form.mobile.value;

        signInWithPhoneNumber(auth, mobileNumber, recaptchaVerifier)
            .then((confirmationResult) => {

                // setOtpSent(true);

                authConfirmationResult = confirmationResult;

                setStep(2);

            }).catch((error) => {

            setError(error.message);
            // recaptchaVerifier?.clear();
            window.grecaptcha?.reset();
            console.error(error);
        });


    };

    const verifyOTP = (e) => {
        e.preventDefault();
        setError('');
        const form = e.target.form;
        const otp = form.otp.value;

        authConfirmationResult.confirm(otp).then((result) => {
            // User signed in successfully. Redirect
            const user = result.user;

            setShow(false);

        }).catch((error) => {
            setError(error.message);
            console.error(error);


        });

    };

    return (
        <>
            <Modal
                size="md"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="signin-modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="signin-modal-title">
                        SIGN IN
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        {
                            step && step === 1 &&
                            <>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Mobile Number</Form.Label>
                                    <Form.Control type="tel" name="mobile" placeholder="Enter Mobile Number"
                                                  className={error ? 'is-invalid' : 'is-valid'}/>
                                    <Form.Text className="text-muted">
                                        We'll never share your number with anyone else.
                                    </Form.Text>

                                </Form.Group>
                                <Button text="Sign In" extraClass="primary btn-round text-white" onClick={sendOTP}/>

                            </>
                        }
                        {
                            step && step === 2 &&
                            <>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Enter OTP</Form.Label>
                                    <Form.Control type="text" name="otp" placeholder="OTP"/>

                                </Form.Group>
                                <Button text="Verify" extraClass="primary btn-round text-white" onClick={verifyOTP}/>

                            </>

                        }
                        {error &&
                        <Error message={error}/>
                        }
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SignIn;