import {useState, useEffect} from 'react';
import Button from '../../common/Button';
import {getGoals} from './Api'
import SideBar from '../../SideBar';
import alertService from '../../Alert';
import Skeleton from '../../common/Skeleton';
import Card from './Card.js';
import DashboardBanner from '../../common/DashboardBanner';
import Tabs from '../../common/Tabs/Tabs.js';
import banner from './images/target.jpg';

const List = ({active}) => {

    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(6);
    const [sortBy, setSortBy] = useState('desc')
    const [orderBy, setOrderBy] = useState('start_date')
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
                                                     name: 'recent',
                                                     text: 'Text 2!'
                                                 },
                                                 {
                                                     name: 'active',
                                                     text: 'Text 3 !'
                                                 },
                                                 {
                                                     name: 'achieved',
                                                     text: 'Text 4!'
                                                 }
                                             ])

    useEffect(() => {

        getGoalsData();
        
    }, [activeTab, page, perPage, sortBy, orderBy, searchBtn, search])


    const getGoalsData = () => {
     
        setLoading(true);
        let filterData = {
            page: page,
            perPage: perPage,
            searchData: {
                status: activeTab,
                sort_by: sortBy, //asc, desc
                order_by: orderBy, // can be created date, title, amount, status
                start_date: startDate,
                end_date: endDate,
                search: search,

            }
        }

        getGoals(filterData).then((response) => {
            setGoals(response.data.goals || [])
            setLoading(false);

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
                    <div className="row">
                        <SideBar active={active}/>

                        {loading && <Skeleton totalCollections="1"/>}
                        {!loading &&

                        <div className="col-md-9">
                            <h1 className="font_30 mb-3"><i className="fas fa-bullseye mr-2"></i>Goals</h1>
                            <Tabs
                                tabTitle={tabTitle}
                                setActiveTab={setActiveTab}
                                activeTab={activeTab}
                            />
                            {goals &&
                                <Card

                                    loading={loading}
                                    goals={goals}
                                    perPage={perPage}
                                    orderBy={orderBy}
                                    sortBy={sortBy}
                                    search={search}
                                    start_date={startDate}
                                    end_date={endDate}
                                    setStartDate={setStartDate}
                                    setEndDate={setEndDate}
                                    setPage={setPage}
                                    setPerPage={setPerPage}
                                    setSortBy={setSortBy}
                                    setOrderBy={setOrderBy}
                                    setSearch={setSearch}
                                    setSearchBtn={setSearchBtn}
                                    onSubmitSuccess={() => {
                                        getGoalsData()
                                    }}
                                />
                            }
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default List;