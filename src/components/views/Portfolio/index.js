import {useEffect, useState} from 'react';
import Button from '../../common/Button';
import Error from '../../common/Error';
import SideBar from '../../SideBar';
import DashboardBanner from '../../common/DashboardBanner';


import banner from './images/banner.jpg';
import {getPortfolio, addPortfolio} from "./api";

import PortfolioForm from './PortfolioModal';

import PortfolioTable, {DemoTable} from "./PortfolioTable";
import CurrencyForm from "./CurrencyForm";
import TableSkeleton from "../../common/RectangularSkeleton";
import DeleteModal from "./DeleteModal";


const Portfolio = ({active}) => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const [portfolios, setPortfolios] = useState([]);
    const [currency, setCurrency] = useState('');
    const [activePortfolio, setActivePortfolio] = useState(null);

    const [showPortfolioModal, setShowPortfolioModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        getData();

    }, []);

    const getData = () => {

        setError('');
        setLoading(true);

        getPortfolio().then(response => {

            let data = response.data;
            const portfolio = data.portfolios;

            setPortfolios(portfolio);
            setCurrency(data.currency);

            setLoading(false);

        }).catch(err => {

            setError(err.message);
        });

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
                            <h3>Currency</h3>
                            <CurrencyForm value={currency}/>

                            <div className="row">
                                <div className="col-sm-9 col-md-6">
                                    <h3>Income/Expenses</h3>
                                </div>
                                <div className="col-sm-3 col-md-6">
                                    <Button onClick={() => {
                                        setShowPortfolioModal(true)
                                    }} type="submit" text="Add New"
                                            extraClass="primary btn-round text-white float-md-end"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">

                                    {error ? <Error message={error}/> : loading ? <TableSkeleton/> :
                                        <PortfolioTable portfolios={portfolios}
                                                        onEditInit={(portfolio) => {
                                                            setActivePortfolio(portfolio);
                                                            setShowPortfolioModal(true);
                                                        }}
                                                        onDeleteInit={(portfolio) => {
                                                            setActivePortfolio(portfolio);
                                                            setShowDeleteModal(true);
                                                        }}

                                        />}
                                </div>
                            </div>
                            {/*<DemoTable portfolios={portfolios}/>*/}
                            {/*Portfolio popup*/}
                            {showPortfolioModal && <PortfolioForm portfolio={activePortfolio} show={showPortfolioModal}
                                                                  handleClose={() => {
                                                                      setShowPortfolioModal(false);
                                                                      setActivePortfolio(null);
                                                                  }}
                                                                  onSubmitSuccess={() => {
                                                                      getData()
                                                                  }}
                            />}
                            <DeleteModal portfolio={activePortfolio} show={showDeleteModal} handleClose={() => {
                                setShowDeleteModal(false);
                                setActivePortfolio(null);
                            }}
                                         onSubmitSuccess={() => {
                                             getData()
                                         }}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Portfolio;