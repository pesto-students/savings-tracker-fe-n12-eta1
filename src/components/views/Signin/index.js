import {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from '../../common/Button/index.js';
import {omit} from 'lodash'
import {useNavigate} from "react-router-dom";

import Error from '../../common/Error/index.js';

import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {auth} from '../../../firebase';

import './index.css';
import Loader from "../../common/Loader";
import {getUserStatus} from "./api";

let authConfirmationResult;

const SignIn = ({show, setShow}) => {

    const navigate = useNavigate();

    useEffect(() => {
        setStep(1);

        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {'size': 'invisible'}, auth);
        }


    }, []);


    const [error, setError] = useState();

    const [step, setStep] = useState(1);

    const [loading, setLoading] = useState(false);


    const sendOTP = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const form = e.target.form;
        const mobileNumber = form.mobile.value;

        signInWithPhoneNumber(auth, mobileNumber, window.recaptchaVerifier)
            .then((confirmationResult) => {

                authConfirmationResult = confirmationResult;

                setStep(2);
                setLoading(false);

            }).catch((error) => {

            console.error(error);
            setError('Please use a valid phone number with the Country code.');
            setLoading(false);
            window.grecaptcha?.reset();
        });


    };

    const verifyOTP = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const form = e.target.form;
        const otp = form.otp.value;

        authConfirmationResult.confirm(otp).then((result) => {
            // User signed in successfully. Redirect

            getUserStatus().then((response => {

                if (response.data.returning_user) {
                    navigate('/dashboard');
                } else {//if new user
                    navigate('/onboarding');
                }
                setStep(1);
                setShow(false);
                setLoading(false);

            })).catch(err => {
                setError('Server Error. Please try again');
                setLoading(false);

            });


        }).catch((error) => {
            setError('Please confirm that the OTP is correct.');
            setLoading(false);

        });

    };

    return (
        <>
            <Modal

                size="md"
                show={show}
                onHide={() => {
                    setShow(false);
                    setStep(1)
                }
                }
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
                                <div className="d-flex">
                                    <Button disabled={loading} text="Sign In" extraClass="primary btn-round text-white"
                                            onClick={sendOTP}/>
                                    <Loader visible={loading}/></div>

                            </>
                        }
                        {
                            step && step === 2 &&
                            <>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Enter OTP</Form.Label>
                                    <Form.Control type="text" name="otp" placeholder="OTP"/>

                                </Form.Group>
                                <div className="d-flex">

                                    <Button text="Verify" extraClass="primary btn-round text-white"
                                            onClick={verifyOTP}/>
                                    <Loader visible={loading}/>

                                </div>

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