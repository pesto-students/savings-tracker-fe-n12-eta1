import {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from '../../common/Button/index.js';
import {useNavigate} from "react-router-dom";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";


import Error from '../../common/Error/index.js';

import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {auth} from '../../../firebase';

import './index.css';
import Loader from "../../common/Loader";
import {getUserStatus} from "./api";
import {useDispatch} from "react-redux";
import OTPResendButton from "./otp-timer";

let authConfirmationResult;

const SignIn = ({show, setShow}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState();

    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);

    useEffect(() => {

        setPhoneNumber('');
        let btn = document.getElementById('signin-btn');

        if (btn && show) {

            window.recaptchaVerifier = new RecaptchaVerifier(
                btn,
                {
                    'size': 'invisible',
                },
                auth
            );

            try {
                window.recaptchaVerifier.render().then((widgetId) => {
                });
            }
            catch (e) {

            }
        }

    }, [show]);


    const sendOTP = (e) => {
        if (e) {
            e.preventDefault();
        }
        setError('');

        if (phoneNumber === '') {
            setError('Please enter a phone number');
            return;
        }

        window.recaptchaVerifier.verify().then(function () {

            startOTPTimer();

            setLoading(true);

            signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
                .then((confirmationResult) => {

                    authConfirmationResult = confirmationResult;
                    setStep(2);
                    setLoading(false);

                }).catch((error) => {

                setError('Please use a valid phone number with the Country code.');
                setLoading(false);
            });

        }).catch((err) => {
            setError(err.message);
            setLoading(false);
        });


    };

    const startOTPTimer = () => {
        setOtpTimer(() => 30);
    };

    const verifyOTP = (e) => {
        e.preventDefault();
        setError('');
        const form = e.target.form;
        const otp = form.otp.value;

        if (otp === '') {
            setError('Please enter OTP');
            return;
        }

        setLoading(true);

        authConfirmationResult.confirm(otp).then((result) => {
            // User signed in successfully. Redirect

            dispatch({type: 'APP_LOADING', payload: true});

            getUserStatus().then((response => {

                if (response.data.returning_user) {
                    navigate('/dashboard');
                } else {//if new user
                    navigate('/onboarding');
                }
                setStep(1);
                setShow(false);
                setLoading(false);

                dispatch({type: 'APP_LOADING', payload: false});


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

                            <div className={step && step === 1 ? '' : 'd-none'}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Mobile Number <span className="text-danger">*</span></Form.Label>
                                    <PhoneInput
                                        numberInputProps={{
                                            className: 'form-control ' + (error ? 'is-invalid' : ''),
                                            disabled: loading
                                        }}
                                        value={phoneNumber}
                                        onChange={(val) => {
                                            setPhoneNumber(() => val);
                                        }}
                                        defaultCountry="IN"
                                    />
                                    <Form.Text className="text-muted">
                                        We'll never share your number with anyone.
                                    </Form.Text>

                                </Form.Group>
                                <div className="d-flex">
                                    <Button onClick={sendOTP} id="signin-btn" disabled={loading} text="Sign In"
                                            extraClass="primary btn-round text-white"
                                    />
                                    <Loader visible={loading}/></div>


                            </div>
                        }
                        {

                            <div className={step && step === 2 ? '' : 'd-none'}>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Enter OTP <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" name="otp" placeholder="OTP"/>

                                </Form.Group>
                                <div className="d-flex">
                                    <Button text='Go Back' extraClass="info me-3" onClick={() => setStep(1)}/>
                                    <Button disabled={loading} text="Verify" extraClass="primary btn-round text-white"
                                            onClick={verifyOTP}/>
                                    <Loader visible={loading}/>

                                </div>
                                {step === 2 && <OTPResendButton count={otpTimer} onClick={sendOTP} onDone={() => {
                                }}/>}


                            </div>

                        }
                        <p className="text-black-50 mt-3"><span className="text-danger">*</span> required field</p>
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