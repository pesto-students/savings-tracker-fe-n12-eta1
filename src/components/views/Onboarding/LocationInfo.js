import Button from "../../common/Button";
import {useState} from "react";
import {validateLocationFields} from "./utils";
import Error from "../../common/Error";

const LocationInfo = (props) => {

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

        e.target.setAttribute('data-touched', '1');
        setErrors(validateLocationFields(e.target.form))
    };

    const beforeNextStep = (e) => {

        const form = e.target.form;

        const formErrors = validateLocationFields(form, true);

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        props.nextStep();

    };

    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <h5><i className="fas fa-map-marker-alt"></i> &nbsp;Location Info</h5>

                </div>
            </div>
            <div className="row">

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="country" className="form-label">Country <span
                            className="text-danger">*</span></label>
                        <input onChange={handleChange} type="text" className="form-control" id="country"
                               name="country"/>
                        {errors.country && <Error message={errors.country}/>}

                    </div>
                </div>


                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="city" className="form-label">City <span className="text-danger">*</span></label>
                        <input onChange={handleChange} type="text" className="form-control" id="city"
                               name="city"/>
                        {errors.city && <Error message={errors.city}/>}

                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="bio" className="form-label">Bio</label>
                        <textarea type="text" className="form-control" id="bio"
                                  name="bio"></textarea>
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-md-6">
                    <div className="form-group">
                        <Button text="Go Back" extraClass="info me-3 primary btn-round text-white"
                                onClick={props.previousStep}/>

                        <Button text="Next" extraClass="primary btn-round text-white" onClick={beforeNextStep}/>
                    </div>
                </div>
            </div>

        </>
    );

};

export default LocationInfo;