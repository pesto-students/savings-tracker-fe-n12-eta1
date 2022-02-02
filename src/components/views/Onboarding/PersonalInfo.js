import Button from "../../common/Button";
import {useSelector} from "react-redux";
import {useState} from "react";
import Error from "../../common/Error";
import {validatePersonalFields} from "./utils";
import {formatDateSimple, formatDateYYYYMMDD} from "../../common/utils";

const PersonalInfo = (props) => {
    const user = useSelector((state) => state.user);
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {

        e.target.setAttribute('data-touched', '1');
        setErrors(validatePersonalFields(e.target.form))
    };

    const beforeNextStep = (e) => {

        const form = e.target.form;

        const formErrors = validatePersonalFields(form, true);

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
                    <h5><i className="fa fa-user mr-2"></i>Personal Info</h5>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="first_name" className="form-label">First Name <span
                            className="text-danger">*</span></label>
                        <input onChange={handleChange} type="text" className="form-control" id="first_name"
                               name="first_name"/>
                        {errors.first_name && <Error message={errors.first_name}/>}

                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="last_name" className="form-label">Last Name <span
                            className="text-danger">*</span></label>
                        <input onChange={handleChange} type="text" className="form-control" id="last_name"
                               name="last_name"/>
                        {errors.last_name && <Error message={errors.last_name}/>}

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email <span
                            className="text-danger">*</span></label>
                        <input onChange={handleChange} type="email" className="form-control" id="email"
                               name="email"/>
                        {errors.email && <Error message={errors.email}/>}

                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="mobile" className="form-label">Mobile <span
                            className="text-danger">*</span></label>
                        <input disabled type="tel" className="form-control" id="mobile"
                               name="mobile" defaultValue={user?.phoneNumber}/>
                    </div>
                </div>
            </div>
            <div className="row">


                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="dob" className="form-label">Date of Birth <span className="text-danger">*</span></label>
                        <input max={formatDateYYYYMMDD(new Date)} onChange={handleChange} type="date"
                               className="form-control" id="dob"
                               name="dob"/>
                        {errors.dob && <Error message={errors.dob}/>}

                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-md-6">
                    <div className="form-group">
                        <Button text="Next" extraClass="primary btn-round text-white" onClick={beforeNextStep}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonalInfo;