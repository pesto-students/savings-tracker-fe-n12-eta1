import Button from '../../common/Button/index.js';
import {useState} from 'react'
import Error from '../../common/Error/index.js';
import ContactService from '../../../actions/contact.service.js'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Spinner from '../../common/Spinner';
import alertService from '../../Alert';
import Loader from "../../common/Loader";


const ContactSection = () => {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const initialValues = {
        name: '',
        email: '',
        message: ''
      };
    
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("* Name is required")
            .max(30, "Name should be of less than 30 characters"),
        email: Yup.string()
            .email("Please enter valid email")
            .required("* Email Address is required"),
        message: Yup.string().required("* Message is required"),
    });

    const contactSubmit = (_formInput) => {
        setLoading(true)
        
        try{
            ContactService(_formInput).then(response => {
                console.log(response.data.message);
                setSuccess(true);
                alertService.showSuccess(response.data.message);
                setLoading(false);
            })
            
        }
        catch(error){
            setLoading(false);
            alertService.showError(error.data.message);
        };
    };

    return (

        <div className="section section-contacts" id="contact-section">
            <div className="row">
            {/*loading?<Spinner visible={loading}/>:''*/}
                <div className="col-md-8 ml-auto mr-auto">
                    <h2 className="text-center title">Reach US</h2>

                    <h4 className="text-center description">If you want any assistance, please feel free to contact
                        us.</h4>
                        <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={contactSubmit}
                                // enableReinitialize
                            >
                        {({ isValid, errors }) => (
                        <Form autoComplete="off">
                        <div className="row form-group">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <Field name="name" type="text" placeholder="Your Name" className={errors.name?
                                        'form-control is-invalid':'form-control'
                                    } />
                                    {
                                    errors.name && <Error message={errors.name} />
                                    }
                                </div>

                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <Field name="email" type="email" placeholder="Your Email Address" className={errors.email?
                                        'form-control is-invalid':'form-control'
                                    } />
                                    {
                                    errors.email && <Error message={errors.email} />
                                    }
                                </div>

                            </div>

                        </div>
                        

                        <div className="form-group">
                            <Field as="textarea" name="message" type="text" placeholder="Your Message"
                                      className={errors.message?
                                      'form-control is-invalid':'form-control'
                                       } rows="4" />

                            {
                            errors.message && <Error message={errors.message} />
                            }
                        </div>
                        <div className="row">
                            <div className="col-md-4 ml-auto mr-auto text-center">
                            <Button disabled={!isValid} type="submit" text="Send Message" extraClass="primary btn-round text-white"/>
                            <Loader
                            visible={loading}/>
                            
                            </div>
                            {success ?
                    <span style={{color: "green"}}>Thanks for contacting us, we will reach you soon.</span> : ''
                }
                        </div>
                    </Form>
                )}
                </Formik>
                </div>
                
            </div>
        </div>
    );
}
export default ContactSection;