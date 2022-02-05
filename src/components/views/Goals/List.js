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

const List = ({active}) => {

    const [loading, setLoading] = useState(true)
    const [currency, setCurrency] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(6);


    const [sortFields, setSortFields] = useState('start_date___desc');

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [search, setSearch] = useState('')
    const [searchBtn, setSearchBtn] = useState(false)
    const [goals, setGoals] = useState('')
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

    }, [activeTab, page, perPage, sortFields, searchBtn, search])

    const getGoalsData = () => {

        setLoading(true);

        const [orderBy, sortOrder] = sortFields.split('___');

        let filterData = {
            page: page,
            perPage: perPage,
            searchData: {
                status: activeTab,
                sort_by: sortOrder, //asc, desc
                order_by: orderBy, // can be created date, title, amount, status
                start_date: startDate,
                end_date: endDate,
                search: search,

            }
        }


        getGoals(filterData).then((response) => {
            setGoals(response.data.goals || [])
            setLoading(false);
            setCurrency(response.data.currency);

        }).catch((error) => {
            setLoading(false);
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
                            <div className="row mt-5 mb-3 justify-content-start">
                                <div className="col-md-15 ">
                                    <Tabs
                                        tabTitle={tabTitle}
                                        setActiveTab={setActiveTab}
                                        activeTab={activeTab}
                                    />
                                </div>
                            </div>

                            {loading && <Skeleton totalCollections="1"/>}
                            {!loading && goals &&
                            <Card

                                loading={loading}
                                goals={goals}
                                currency={currency}
                                perPage={perPage}
                                search={search}
                                start_date={startDate}
                                end_date={endDate}
                                setStartDate={setStartDate}
                                setEndDate={setEndDate}
                                setPage={setPage}
                                setPerPage={setPerPage}
                                setSortFields={setSortFields}
                                setSearch={setSearch}
                                setSearchBtn={setSearchBtn}
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