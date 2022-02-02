import Button from "../../common/Button";
import CurrencySelect from "../../common/CurrencySelect";
import Loader from "../../common/Loader";
import {useState} from "react";
import {validateFinancialFields} from "./utils";
import Error from "../../common/Error";

const FinancialInfo = ({previousStep, loading}) => {

    const [errors, setErrors] = useState({});

    const beforeNextStep = (e) => {

        const form = e.target.form;

        const formErrors = validateFinancialFields(form, true);

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            e.preventDefault();
            return;
        }


    };

    return (

        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <h5><i className="fas fa-coins"></i> &nbsp;Financial Info</h5>

                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="country" className="form-label">Currency <span className="text-danger">*</span></label>
                        <CurrencySelect name="currency" value="INR"/>
                        {errors.currency && <Error message={errors.currency}/>}

                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="city" className="form-label">Monthly Income</label>
                        <input min="0" type="number" className="form-control" id="monthly-income"
                               name="monthly_income"/>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="bio" className="form-label">Monthly Expenses</label>
                        <input min="0" type="number" className="form-control" id="monthly-expenses"
                               name="monthly_expenses"/>

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group d-flex">
                        <Button text="Go Back" extraClass="info me-3 primary btn-round text-white"
                                onClick={previousStep}/>
                        <Button type="submit" text="Proceed" onClick={beforeNextStep}
                                extraClass="primary btn-round text-white"/>
                        <Loader visible={loading}/>
                    </div>

                </div>
            </div>
        </>
    );
};

export default FinancialInfo;