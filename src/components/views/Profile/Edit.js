import {useState} from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from '../../common/Button';
import Error from '../../common/Error';
import {formatDob} from "./utils";
import Spinner from '../../common/Spinner';
import {saveProfile} from "./api";


const Edit = ({setEdit, userData, onSave}) => {

    const [loading, setLoading] = useState(false);

    const initialValues = {
        first_name: userData?.first_name || '',
        last_name: userData?.last_name || '',
        email: userData?.email || '',
        phone: userData?.phone || '',
        dob: formatDob(userData?.dob) || '',
        country: userData?.country || '',
        city: userData?.city || '',
        bio: userData?.bio || '',
      };

      const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

      
    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required("First Name is required")
            .max(30, "First Name should be of less than 30 characters"),
        last_name: Yup.string()
            .required("Last Name is required")
            .max(30, "Last Name should be of less than 30 characters"),
        email: Yup.string()
            .email("Please enter valid email")
            .required("Email Address is required"),
        phone: Yup.string()
            .matches(phoneRegExp, "Contact number is not valid")
            .required("Mobile Number is required"),
        dob: Yup.string()
            .required("Date of Birth is Required"),
        country: Yup.string().required("Country is required"),
        city: Yup.string().required("City is required"),
    });

    const handleSubmit = async (_formInput) => {


        console.log(_formInput)

            setLoading(true);

            // const formData = new FormData(_formInput);
            // const data = Object.fromEntries(formData);

            saveProfile(_formInput).then((response) => {
                console.log(response)
                setLoading(false);

                onSave(_formInput);

            }).catch(err => {
                console.log(err)
                setLoading(false);
            });

    };

    return (

        <div className="col-md-9">
            <div className="row">
            {loading?<Spinner visible={loading}/>:''}
                <div className="col-md-6">
                    <h1 className="font_30"><i className="fa fa-user mr-2"></i>Edit Profile</h1>
                </div>
                <div className="col-md-6 flex">
                    <Button
                        text="Back"
                        extraClass="primary btn-round text-white ml-auto"
                        icon={<i className="fas fa-arrow-alt-circle-left mr-2"></i>}
                        onClick={(e) => setEdit(false)}
                    />
                </div>
            </div>
            <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    // enableReinitialize
                  >
            {({ isValid, errors }) => (
            <Form autoComplete="off">
                <div className="row mt-4 ply_infrm ">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>First Name <span className='text-danger'>*</span></label>
                            <Field name="first_name" type="text"
                                   placeholder="First Name" className="form-control"
                                   defaultValue={userData?.first_name}/>
                            {
                                errors.first_name && <Error message={errors.first_name}/>
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Last Name <span className='text-danger'>*</span></label>
                            <Field name="last_name" type="text"
                                   placeholder="Last Name" className="form-control"/>
                            {
                                errors.last_name && <Error message={errors.last_name}/>
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">

                            <label>Email</label>
                            <Field name="email" type="email" 
                                placeholder="Your Email Address" className="form-control"/>
                            {
                                errors.email && <Error message={errors.email}/>
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">

                            <label>Phone</label>
                            <Field name="phone" type="text"
                                   placeholder="Phone" className="form-control"/>
                            {
                                errors.phone && <Error message={errors.phone}/>
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">

                            <label>Date of Birth</label>
                            <Field name="dob" type="date" 
                                placeholder="DOB" className="form-control"/>
                            {
                                errors.dob && <Error message={errors.dob}/>
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">

                            <label>Country</label>
                            <Field name="country" type="text" 
                                placeholder="Country" className="form-control"/>
                            {
                                errors.country && <Error message={errors.country}/>
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">

                            <label>City</label>
                            <Field name="city" type="text"
                                placeholder="City" className="form-control"/>
                            {
                                errors.city && <Error message={errors.city}/>
                            }
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Bio</label>
                            <textarea name="bio" type="text" placeholder="Your Bio"
                                      className="form-control" rows="4"
                                    >
                            </textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 ml-auto mr-auto text-center">
                            <Button disabled={!isValid} type="submit" text="Update Profile"
                                    extraClass="primary btn-round text-white"/>

                        </div>
                    </div>
                </div>
                </Form>
            )}
            </Formik>
        </div>
    );
}

export default Edit;
