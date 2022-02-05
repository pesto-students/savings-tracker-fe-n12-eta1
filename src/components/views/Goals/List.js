import {useState, useEffect} from 'react';
import Button from '../../common/Button';
import {getGoals} from './Api'
import SideBar from '../../SideBar';
import alertService from '../../Alert';
import Card from './Card.js';
import DashboardBanner from '../../common/DashboardBanner';
import Tabs from '../../common/Tabs/Tabs.js';
import banner from './images/target.jpg';
import Skeleton from '../../common/Skeleton';
import {useDispatch} from "react-redux";
import AddGoal from "./AddGoal";
import React from "react";

const List = ({active}) => {

    const dispatch = useDispatch();
    const [currency, setCurrency] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(6);

    const [add, setAdd] = useState(false);


    const [sortFields, setSortFields] = useState('start_date___desc');//split on ___ for field + order

    const [search, setSearch] = useState({query: '', start_date: '', end_date: ''});
    const [goals, setGoals] = useState({});
    const [activeTab, setActiveTab] = useState('All')
    const [tabTitle, setTabtitle] = useState([
                                                 {
                                                     name: 'All',
                                                     text: 'Text 1'
                                                 },
                                                 {
                                                     name: 'Recent',
                                                     text: 'Text 2!'
                                                 },
                                                 {
                                                     name: 'Active',
                                                     text: 'Text 3 !'
                                                 },
                                                 {
                                                     name: 'Achieved',
                                                     text: 'Text 4!'
                                                 }
                                             ])

    useEffect(() => {

        getGoalsData();

    }, [activeTab, page, perPage, sortFields, search]);

    const getGoalsData = () => {

        dispatch({type: 'PAGE_LOADING', payload: true});

        const [orderBy, sortOrder] = sortFields.split('___');

        let filterData = {
            page: page,
            perPage: perPage,
            searchData: {
                status: activeTab,
                sort_by: sortOrder, //asc, desc
                order_by: orderBy, // can be created date, title, amount, status
                start_date: search.start_date,
                end_date: search.end_date,
                search: search.query,

            }
        };

        getGoals(filterData).then((response) => {

            setGoals(response.data.goals);
            dispatch({type: 'PAGE_LOADING', payload: false});
            setCurrency(response.data.currency);

        }).catch((error) => {
            dispatch({type: 'PAGE_LOADING', payload: false});

            alertService.showError(error/*.data.message*/);
        });
    }

    return (
        <>

            <DashboardBanner
                image={banner}
            />
            <div className="main main-raised dashoard-container">
                <div className="container">
                    <div className="row mt-5 mb-5 justify-content-start">
                        <SideBar active={active}/>

                        <div className="col-md-9">
                            <h1 className="font_30 mb-3"><i className="fas fa-bullseye mr-2"></i>Goals</h1>
                            <div className="row mt-5 mb-3 justify-content-start align-items-center">
                                <div className="col-md-10">
                                    <Tabs
                                        tabTitle={tabTitle}
                                        setActiveTab={setActiveTab}
                                        activeTab={activeTab}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <Button onClick={(e) => setAdd(true)} type="submit" text="Add Goal"
                                            extraClass="primary float-end"/>
                                    {
                                        add && <AddGoal add={add} setAdd={setAdd} onSubmitSuccess={() => {
                                            getGoalsData()
                                        }}/>
                                    }
                                </div>
                            </div>
                            {goals &&
                            <Card
                                goals={goals}
                                currency={currency}
                                perPage={perPage}
                                onSearch={setSearch}
                                setPage={setPage}
                                setPerPage={setPerPage}
                                setSortFields={setSortFields}
                                onSubmitSuccess={() => {
                                    getGoalsData()
                                }}
                            />
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default List;