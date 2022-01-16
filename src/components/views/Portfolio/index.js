import {useEffect, useState} from 'react';
import Button from '../../common/Button';
import Error from '../../common/Error';
import SideBar from '../../SideBar';
import DashboardBanner from '../../common/DashboardBanner';


import banner from './images/banner.jpg';
import CurrencySelect from "../../common/CurrencySelect";
import {getPortfolio, savePortfolio} from "./api";
import {saveProfile} from "../Profile/api";

const Portfolio = ({active}) => {

    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);

    const profileFields = ['monthly_income', 'monthly_expenses', 'currency'];


    const [portfolio, setPortfolio] = useState({
                                                   fields: {},
                                                   errors: {},
                                                   success: false
                                               });

    const [portfolioData, setPortfolioData] = useState({currency: '', monthly_income: '', monthly_expenses: ''});


    useEffect(() => {

        getPortfolio().then(response => {
            const portfolio = response.data.portfolio;
            setPortfolioData(portfolio);
        });

    }, []);

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

        if (!fields["monthly_income"]) {
            formIsValid = false;
            errors["income"] = "Income field is required";
        }

        //Expenses

        if (!fields["monthly_expenses"]) {
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


        const form = e.target;

        for (let i = 0; i < profileFields.length; i++) {
            const field = profileFields[i];
            portfolio.fields[field] = form[field].value.trim();
        }

        setPortfolio({fields: portfolio.fields, success: false});

        if (handleValidation()) {


            setLoading(true);

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            savePortfolio(data).then((response) => {
                setLoading(false);

            }).catch(err => {
                setLoading(false);
            });


        }
    };


    return (
        <>
            <DashboardBanner
                image={banner}
            />
            <div className="main main-raised dashoard-container">
                <div className="container">
                    <div className="row">
                        <SideBar active={active}/>

                        <div className="col-md-9">
                            <h1 className="font_30"><i className="fas fa-users-cog mr-2"></i>Portfolio</h1>
                            <form onSubmit={handlesubmit}>
                                <div className="row mt-4 ply_infrm ">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Currency</label>
                                            <CurrencySelect value={portfolioData.currency} onChange={handleChange}/>
                                            {(typeof portfolio.errors !== 'undefined' && portfolio.errors["currency"] !== 'undefined') ?
                                                <Error message={portfolio.errors.currency}/> : ''
                                            }
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Income</label>
                                            <input name="monthly_income" type="number" onChange={handleChange}
                                                   defaultValue={portfolioData.monthly_income}
                                                   placeholder="Income" className="form-control"/>
                                            {(typeof portfolio.errors !== 'undefined' && portfolio.errors["income"] !== 'undefined') ?
                                                <Error message={portfolio.errors.income}/> : ''
                                            }
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Expenses</label>
                                            <input name="monthly_expenses" type="number" onChange={handleChange}
                                                   defaultValue={portfolioData.monthly_expenses}
                                                   placeholder="Expenses" className="form-control"/>
                                            {(typeof portfolio.errors !== 'undefined' && portfolio.errors["expenses"] !== 'undefined') ?
                                                <Error message={portfolio.errors.expenses}/> : ''
                                            }
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-4 ml-auto mr-auto text-center">
                                            <Button type="submit" text="Update"
                                                    extraClass="primary btn-round text-white"/>
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