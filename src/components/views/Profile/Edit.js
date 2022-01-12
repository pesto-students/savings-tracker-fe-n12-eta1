import {useState} from 'react';
import Button from '../../common/Button';
import Error from '../../common/Error';
import ProfileService from '../../../actions/profile.service';

const Edit = ({setEdit}) => {

    const [profile, setProfile] = useState({
                                               fields: {},
                                               errors: {},
                                               success: false
                                           })

    const [loading, setLoading] = useState(true)

    const handleValidation = (e) => {
        setLoading(false);
        let fields = profile.fields;
        let errors = {};
        let formIsValid = true;

        if (typeof profile.fields === 'undefined') {
            errors["first_name"] = "Name field is required";
            errors["last_name"] = "Last Name field is required";
            errors["email"] = "Email field is required";
            errors["mobile"] = "Mobile field is required";
            errors["dob"] = "Date of birth field is required";
            errors["country"] = "Country field is required";
            errors["city"] = "City field is required";
            errors["bio"] = "Bio field is required";
            setProfile({errors: errors, fields: fields});
            return false
        }

        //First Name

        if (!fields["first_name"]) {
            formIsValid = false;
            errors["first_name"] = "First Name field is required";
        }

        if (typeof fields["first_name"] !== "undefined") {
            if (!fields["first_name"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["first_name"] = "First Name contains only letters";
            }
        }

        //Last Name

        if (!fields["last_name"]) {
            formIsValid = false;
            errors["last_name"] = "Last Name field is required";
        }

        if (typeof fields["last_name"] !== "undefined") {
            if (!fields["last_name"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["last_name"] = "Last Name contains only letters";
            }
        }

        //Email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Email field is required";
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf("@");
            let lastDotPos = fields["email"].lastIndexOf(".");

            if (
                !(
                    lastAtPos < lastDotPos &&
                    lastAtPos > 0 &&
                    fields["email"].indexOf("@@") == -1 &&
                    lastDotPos > 2 &&
                    fields["email"].length - lastDotPos > 2
                )
            ) {
                formIsValid = false;
                errors["email"] = "Email field is not valid";
            }
        }

        //Mobile
        if (!fields["mobile"]) {

            formIsValid = false;
            errors["mobile"] = "Mobile number field is required";
        } else {

            if (fields["mobile"].length !== 10) {
                formIsValid = false;
                errors["mobile"] = "Mobile number field is not valid";
            }
        }

        //DOB
        if (!fields["dob"]) {

            formIsValid = false;
            errors["dob"] = "Date of birth field is required";
        }

        //country
        if (!fields["country"]) {

            formIsValid = false;
            errors["country"] = "Country field is required";
        }

        //city
        if (!fields["city"]) {

            formIsValid = false;
            errors["city"] = "City field is required";
        }

        setProfile({errors: errors, fields: fields});
        setLoading(false);
        return errors;
    }

    const handleChange = (e) => {
    
        let fields = profile.fields;
        fields[e.target.name] = e.target.value;
        setProfile({fields});

        let errors = handleValidation();

        setProfile({errors, fields});

    }

    const handlesubmit = (e) => {
        e.preventDefault();

        let  errors = handleValidation()
        if ( Object.keys(errors).length === 0) {

            console.log('form submit success')
            ProfileService().then(response => {
                console.log(response)
                profile.success = response
            })

        } else {
            console.log(profile)
            //alert("Form has errors.");
        }
    }

    return (

        <div className="col-md-9">
            <div className="row">
                <div className="col-md-6">
                    <h1 className="font_30"><i className="fa fa-user mr-2"></i>Edit Profile</h1>
                </div>
                <div className="col-md-6 flex">
                    <Button
                        text="Back"
                        extraClass="primary btn-border ml-auto"
                        icon={<i className="fas fa-arrow-alt-circle-left mr-2"></i>}
                        onClick={(e) => setEdit(false)}
                    />
                </div>
            </div>

            <form>
                <div className="row mt-4 ply_infrm ">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>First Name <span className='text-danger'>*</span></label>
                            <input name="first_name" type="text" onChange={handleChange}
                                   placeholder="First Name" className="form-control"/>
                            {(typeof profile.errors !== 'undefined' && profile.errors["first_name"] !== 'undefined') ?
                                <Error message={profile.errors.first_name}/> : ''
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Last Name <span className='text-danger'>*</span></label>
                            <input name="last_name" type="text" onChange={handleChange}
                                   placeholder="Last Name" className="form-control"/>
                            {(typeof profile.errors !== 'undefined' && profile.errors["last_name"] !== 'undefined') ?
                                <Error message={profile.errors.last_name}/> : ''
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Email <span className='text-danger'>*</span></label>
                            <input name="email" type="email" onChange={handleChange}
                                   placeholder="Your Email Address" className="form-control"/>
                            {(typeof profile.errors !== 'undefined' && profile.errors["email"] !== 'undefined') ?
                                <Error message={profile.errors.email}/> : ''
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Mobile <span className='text-danger'>*</span></label>
                            <input name="mobile" type="text" onChange={handleChange}
                                   placeholder="Mobile" className="form-control"/>
                            {(typeof profile.errors !== 'undefined' && profile.errors["mobile"] !== 'undefined') ?
                                <Error message={profile.errors.mobile}/> : ''
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Date of Birth <span className='text-danger'>*</span></label>
                            <input name="dob" type="date" onChange={handleChange}
                                   placeholder="DOB" className="form-control"/>
                            {(typeof profile.errors !== 'undefined' && profile.errors["dob"] !== 'undefined') ?
                                <Error message={profile.errors.dob}/> : ''
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Country <span className='text-danger'>*</span></label>
                            <input name="country" type="text" onChange={handleChange}
                                   placeholder="Country" className="form-control"/>
                            {(typeof profile.errors !== 'undefined' && profile.errors["country"] !== 'undefined') ?
                                <Error message={profile.errors.country}/> : ''
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label>City <span className='text-danger'>*</span></label>
                            <input name="city" type="text" onChange={handleChange}
                                   placeholder="City" className="form-control"/>
                            {(typeof profile.errors !== 'undefined' && profile.errors["city"] !== 'undefined') ?
                                <Error message={profile.errors.city}/> : ''
                            }
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Bio</label>
                            <textarea name="bio" type="text" placeholder="Your Bio"
                                      className="form-control" rows="4"
                                      onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 ml-auto mr-auto text-center">
                            <Button type="button" text="Update Profile" extraClass="primary btn-round text-white"
                                    onClick={handlesubmit} disabled={(profile.errors 
                                        && Object.keys(profile.errors).length === 0
                                        && Object.getPrototypeOf(profile.errors) === Object.prototype) ?
                                    '' : 'disabled'
                                }/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Edit;