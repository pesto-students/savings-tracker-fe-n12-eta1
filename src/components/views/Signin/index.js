import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from '../../common/Button/index.js';
import {omit} from 'lodash'
import Error from '../../common/Error/index.js';
import './index.css';

const SignIn = ({show, setShow}) => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1);

    const handleChange = (event) => {
        //To stop default events    
        event.persist();

        let name = event.target.name;
        let val = event.target.value;

        validate(name,val);
        //Let's set these values in state

        setValues({
            ...values,   //spread operator to store old values
            [name]:val,
        })

        console.log(errors);
        console.log(values);

    }

    const handleSubmit = () => {
       
        // check currunt step
        console.log(errors);
        console.log(values);

        if(step===1 && values?.mobile?.length !==10){
            
            setErrors({
                ...errors,
                mobile: errors?.mobile || 'Mobile number is required'
            })

            return false;
        }

        setStep(2);

    }

    const validate = (name, value) => {
        //A function to validate each input values
    
        switch (name) {
            case 'mobile':
                if (value?.length === 10) {
    
                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "mobile");
                    setErrors(newObj);
                   
                } else {
    
                     // we will set the error state
    
                     setErrors({
                        ...errors,
                        mobile: 'Mobile number is invalid'
                    })
                }
                break;

            case 'otp':
                if (value.length === 4) {
    
                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "otp");
                    setErrors(newObj);
                    
                } else {
    
                        // we will set the error state
    
                        setErrors({
                        ...errors,
                        otp: 'OTP is invalid'
                    })
                }
                break;
    
            default:
                break;
        }
    }

    return (

        <Modal
            size="md"
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
                SIGN IN
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                {
                    step && step===1 &&
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="number" name="mobile" onChange={handleChange} placeholder="Enter Mobile Number" className={errors?.mobile?'is-invalid':'is-valid'} />
                    <Form.Text className="text-muted">
                    We'll never share your number with anyone else.
                    </Form.Text>
                    {errors.mobile &&
                    <Error message={errors.mobile} />
                    }
                </Form.Group>
                }
                {
                    step && step===2 &&
                    <>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter OTP</Form.Label>
                    <Form.Control type="number" name="otp" onChange={handleChange} placeholder="OTP" />
                    {errors.otp &&
                    <Error message={errors.otp} />
                    }
                </Form.Group>
                </>
                }
                <Button text="Sign in" extraClass="primary btn-round text-white" onClick={handleSubmit}/>
                </Form>
            </Modal.Body>
        </Modal>

    );
}

export default SignIn;