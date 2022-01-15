import Button from "../../common/Button";
import CurrencySelect from "../../common/CurrencySelect";
import Loader from "../../common/Loader";

const FinancialInfo = (props) => {
    return (

        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <h5><i className="fas fa-coins"></i> &nbsp;Financial Info</h5>

                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="country" className="form-label">Currency</label>
                        <CurrencySelect name="currency" value="INR"/>
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="city" className="form-label">Monthly Income</label>
                        <input min="0" type="number" className="form-control" id="monthly-income"
                               name="monthly_income"/>
                    </div>
                </div>
            </div>
            <div className="row">


                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="bio" className="form-label">Monthly Expenses</label>
                        <input min="0" type="number" className="form-control" id="monthly-expenses"
                               name="monthly_expenses"/>
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-md-6">
                    <div className="form-group">
                        <Button text="Go Back" extraClass=" me-3 primary btn-round text-white"
                                onClick={props.previousStep}/>
                        <Button type="submit" text="Proceed" extraClass="primary btn-round text-white"/>
                        {/*<Loader visible={loading}/></div>*/}

                </div>
                </div>
            </div>
        </>
    );
};

export default FinancialInfo;