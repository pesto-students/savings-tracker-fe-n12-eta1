import {useState} from 'react';
import Button from '../../common/Button';
import Error from '../../common/Error';
import {formatDob} from "./utils";
import Loader from "../../common/Loader";
import {saveProfile} from "./api";

const Edit = ({setEdit, userData, onSave}) => {

    const profileFields = ['first_name', 'last_name', 'email', 'dob', 'country', 'city', 'bio'];
    const [profile, setProfile] = useState({
                                               fields: {},
                                               errors: {},
                                               success: false
                                           });

    const [loading, setLoading] = useState(false);

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
            errors["phone"] = "Phone field is required";
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
                errors["first_name"] = "First Name must contain only letters";
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
                errors["last_name"] = "Last Name must contain only letters";
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
                    fields["email"].indexOf("@@") === -1 &&
                    lastDotPos > 2 &&
                    fields["email"].length - lastDotPos > 2
                )
            ) {
                formIsValid = false;
                errors["email"] = "Email field is not valid";
            }
        }

        /* //Phone
         if (!fields["phone"]) {

             formIsValid = false;
             errors["phone"] = "Phone number field is required";
         } else {

             if (fields["phone"].length < 10) {
                 formIsValid = false;
                 errors["phone"] = "Phone number field is not valid";
             }
         }*/

        if (!fields["dob"]) {

            formIsValid = false;
            errors["dob"] = "Date of birth field is required";
        }

        if (!fields["country"]) {

            formIsValid = false;
            errors["country"] = "Country field is required";
        }


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

        fields[e.target.name] = e.target.value.trim();
        setProfile({fields, success: false});

    }

    const handleSubmit = (e) => {
        e.preventDefault();


        const form = e.target;

        for (let i = 0; i < profileFields.length; i++) {
            const field = profileFields[i];
            profile.fields[field] = form[field].value.trim();
        }

        setProfile({fields: profile.fields, success: false});


        if (handleValidation()) {

            setLoading(true);

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            saveProfile(data).then((response) => {
                setLoading(false);

                onSave(data);

            }).catch(err => {
                setLoading(false);
            });


        }
    };

    return (

        <div className="col-md-9">
            <div className="row">
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
            <form onSubmit={handleSubmit}>
                <div className="row mt-4 ply_infrm ">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>First Name <span className='text-danger'>*</span></label>
                            <input name="first_name" type="text" onChange={handleChange}
                                   placeholder="First Name" className="form-control"
                                   defaultValue={userData?.first_name}/>
                            {(typeof profile.errors !== 'undefined' && profile.errors["first_name"] !== 'undefined') ?
                                <Error message={profile.errors.first_name}/> : ''
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Last Name <span className='text-danger'>*</span></label>
                            <input name="last_name" type="text" onChange={handleChange}
                                   defaultValue={userData?.last_name}
                                   placeholder="Last Name" className="form-control"/>
                            {(typeof profile.errors !== 'undefined' && profile.errors["last_name"] !== 'undefined') ?
                                <Error message={profile.errors.last_name}/> : ''
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">

                            <label>Email</label>
                            <input name="email" type="email" onChange={handleChange} defaultValue={userData?.email}

                                   placeholder="Your Email Address" className="form-control"/>
                            {(typeof profile.errors !== 'undefined' && profile.errors["email"] !== 'undefined') ?
                                <Error message={profile.errors.email}/> : ''
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">

                            <label>Phone</label>
                            <input disabled name="phone" type="text" onChange={handleChange}
                                   defaultValue={userData?.phone_number}
                                   placeholder="Phone" className="form-control"/>
                            {(typeof profile.errors !== 'undefined' && profile.errors["phone"] !== 'undefined') ?
                                <Error message={profile.errors.phone}/> : ''

                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">

                            <label>Date of Birth</label>
                            <input name="dob" type="date" onChange={handleChange} defaultValue={formatDob(userData.dob)}

                                   placeholder="DOB" className="form-control"/>
                            {(typeof profile.errors !== 'undefined' && profile.errors["dob"] !== 'undefined') ?
                                <Error message={profile.errors.dob}/> : ''
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">

                            <label>Country</label>
                            <input name="country" type="text" onChange={handleChange} defaultValue={userData?.country}

                                   placeholder="Country" className="form-control"/>
                            {(typeof profile.errors !== 'undefined' && profile.errors["country"] !== 'undefined') ?
                                <Error message={profile.errors.country}/> : ''
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">

                            <label>City</label>
                            <input name="city" type="text" onChange={handleChange} defaultValue={userData?.city}

                                   placeholder="City" className="form-control"/>
                            {(typeof profile.errors !== 'undefined' && profile.errors["city"] !== 'undefined') ?
                                <Error message={profile.errors.city}/> : ''
                            }
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Bio</label>
                            <textarea name="bio" type="text" placeholder="Your Bio" defaultValue={userData?.bio}
                                      className="form-control" rows="4"
                                      onChange={handleChange}>
                            </textarea>
                            {(typeof profile.errors !== 'undefined' && profile.errors["bio"] !== 'undefined') ?
                                <Error message={profile.errors.bio}/> : ''
                            }

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 ml-auto mr-auto text-center">
                            <Button disabled={loading} type="submit" text="Update Profile"
                                    extraClass="primary btn-round text-white"/>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Edit;