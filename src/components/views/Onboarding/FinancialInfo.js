import Button from "../../common/Button";

const FinancialInfo = (props) => {
    return <div className="g-3">
        <div className="row mb-3">
            <div className="col-md-3">
                <h4>Financial Info</h4>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-3"><label htmlFor="currency"
                                             className="form-label">Currency</label>
                <select className="form-control" name="currency" id="currency">
                    <option value="INR">₹ (INR)</option>
                    <option value="USD">$ (USD)</option>
                    <option value="EUR">€ (EURO)</option>
                </select></div>
        </div>
        <div className="row mb-3">
            <div className="col-md-3"><label htmlFor="monthly-income" className="form-label">Monthly
                Income</label>
                <input min="0" type="number" className="form-control" id="monthly-income"
                       name="monthly-income"/>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-3"><label htmlFor="monthly-expenses" className="form-label">Monthly Expenses</label>
                <input min="0" type="number" className="form-control" id="monthly-expenses"
                       name="monthly-expenses"/>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-3">
                <Button text="Go Back" extraClass=" me-3 primary btn-round text-white" onClick={props.previousStep}/>
                <Button type="submit" text="Proceed" extraClass="primary btn-round text-white"/>
            </div>
        </div>
    </div>
};

export default FinancialInfo;