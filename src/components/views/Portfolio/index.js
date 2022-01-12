import { useState } from 'react';
import Button from '../../common/Button';
import Error from '../../common/Error';
import ProfileService from '../../../actions/profile.service';
import SideBar from '../../SideBar';
import DashboardBanner from '../../common/DashboardBanner';
import banner from './images/banner.jpg';

const Portfolio = ({active}) => {

    const [portfolio, setPortfolio] = useState({
        fields: {},
        errors: {},
        success: false
    })

    const handleValidation = (e) => {
        let fields = portfolio.fields;
        let errors = {};
        let formIsValid = true;

        if (typeof portfolio.fields === 'undefined') {
            errors["currency"] = "Currency field is required";
            errors["expenses"] = "Expenses field is required";
            errors["income"] = "Income field is required";
            setPortfolio({errors: errors, fields: fields});
            return false
        }

        //Currency

        if (!fields["currency"]) {
            formIsValid = false;
            errors["currency"] = "Currency field is required";
        }

        //Income

        if (!fields["income"]) {
            formIsValid = false;
            errors["income"] = "Income field is required";
        }

        //Expenses

        if (!fields["expenses"]) {
            formIsValid = false;
            errors["expenses"] = "Expenses field is required";
        }

        setPortfolio({errors: errors, fields: fields});
        return formIsValid;
    }

    const handleChange = (e) => {
        let fields = portfolio.fields;
        fields[e.target.name] = e.target.value;
        setPortfolio({fields, success: false});
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        if (handleValidation()) {

            console.log('form submit success')
            ProfileService().then(response => {
                console.log(response)
                portfolio.success = response
            })

        } else {
            console.log(portfolio)
            //alert("Form has errors.");
        }
    }

    return (
        <>
        <DashboardBanner
            image={banner}
        />
        <div className="main main-raised dashoard-container">
            <div className="container">
                <div className="row">
                    <SideBar active={active} />
                    
                    <div className="col-md-9">
                    <h1 className="font_30"><i className="fas fa-users-cog mr-2"></i>Portfolio</h1>
                        <form>
                            <div className="row mt-4 ply_infrm ">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Currency</label>
                                        <select className="form-control" name="currency" id="currency">
                                            <option value="INR">Select Currency</option>
                                            <option value="INR">₹ (INR)</option>
                                            <option value="USD">$ (USD)</option>
                                            <option value="EUR">€ (EURO)</option>
                                        </select>
                                        {(typeof portfolio.errors !== 'undefined' && portfolio.errors["currency"] !== 'undefined') ?
                                            <Error message={portfolio.errors.currency} /> : ''
                                        }
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Income</label>
                                        <input name="income" type="number" onChange={handleChange}
                                                placeholder="Income" className="form-control"/>
                                        {(typeof portfolio.errors !== 'undefined' && portfolio.errors["income"] !== 'undefined') ?
                                            <Error message={portfolio.errors.income} /> : ''
                                        }
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Expenses</label>
                                        <input name="expenses" type="number" onChange={handleChange}
                                                placeholder="Expenses" className="form-control"/>
                                        {(typeof portfolio.errors !== 'undefined' && portfolio.errors["expenses"] !== 'undefined') ?
                                            <Error message={portfolio.errors.expenses} /> : ''
                                        }
                                    </div>
                                </div>

                                
                                <div className="row mt-3">
                                    <div className="col-md-4 ml-auto mr-auto text-center">
                                        <Button type="button" text="Update" extraClass="primary btn-round text-white" onClick={handlesubmit}/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Portfolio;