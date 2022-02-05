import React, {useState} from 'react';
import './index.css';
import Skeleton from '../../common/Skeleton';
import {useNavigate} from 'react-router-dom';
import Paginate from '../../common/Paginate';
import BillboardChart from 'react-billboardjs';
import 'billboard.js/dist/billboard.css';
import Dropdown from "react-bootstrap/Dropdown";
import AddGoal from './AddGoal';
import EditGoal from './EditGoal';
import Button from '../../common/Button';
import Swal from 'sweetalert2';
import alertService from '../../Alert';
import {deleteGoal} from './Api.js';
import LinesEllipsis from 'react-lines-ellipsis'
import {formatDateSimple} from "../../common/utils";

import {CalendarIcon} from '@heroicons/react/solid';

import GoalSearchForm from "./GoalSearchForm";

const sortFields = [
    {field: 'start_date', order: 'desc', label: 'Start Date - Newest first'},
    {field: 'start_date', order: 'asc', label: 'Start Date - Oldest first'},
    {field: 'total_amount', order: 'desc', label: 'Amount - High to Low'},
    {field: 'total_amount', order: 'asc', label: 'Amount - Low to High'},
    {field: 'title', order: 'asc', label: 'Title - A-Z'},
    {field: 'title', order: 'desc', label: 'Title - Z-A'},
];

const getGoalCompletionPercentage = (goal) => {
    return (goal.saved_amount / goal.total_amount * 100).toFixed(2);
}

const Card = (props) => {

    const [colors, setColors] = useState(['cyan', 'red', 'blue', 'orange', 'yellow', 'green'])
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [goal, setGoal] = useState([]);

    let navigate = useNavigate();
    var goal_cards = props.goals?.docs?.length > 0 ? props.goals.docs.map((goal, index) => {

        const CHART_DATA = {
            columns: [
                ["Progress", 40],
            ],
            type: "gauge",
        };

        const color = {
            pattern: [
                "#FF0000",
                "#F97600",
                "#F6C600",
                "#60B044"
            ],
            threshold: {
                values: [
                    30,
                    60,
                    90,
                    100
                ]
            }
        }

        const zoom = {
            enabled: true
        }

        const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
            <a
                href=""
                ref={ref}
                onClick={e => {
                    e.preventDefault();
                    onClick(e);
                }}
            >
                {children}
                <i className="fa fa-ellipsis-v text-black font-25" aria-hidden="true"></i>
            </a>
        ));

        const handleEdit = (goal) => {

            setEdit(true);

            setGoal(goal);
        }

        const handleView = (goal) => {

            setEdit(true);

            navigate(`goal/${goal._id}`);
        }

        const progress = getGoalCompletionPercentage(goal)
        const colorClass = (progress < 50) ? 'progress-red' : ((progress > 90) ? 'progress-green' : 'progress-yellow')

        const handleDelete = (goal) => {

            try {
                Swal.fire({
                              title: "Are you sure?",
                              text: "You want to delete this goal? ",
                              icon: "warning",
                              confirmButtonText: 'Delete',
                              confirmButtonColor: '#d71616',
                              showCancelButton: true,
                          })
                    .then((result) => {
                        if (result.value) {
                            deleteGoal(goal._id).then((response) => {

                                if (response.success === false) {
                                    setLoading(false)
                                    alertService.showError(response.data.message);
                                }
                                props.onSubmitSuccess();
                                alertService.showSuccess(response.data.message);
                                setLoading(false);

                            }).catch((error) => {
                                setLoading(false);
                                alertService.showError(error.data.message);
                            });
                        }
                    });
            }
            catch (error) {
                setLoading(false);
                alertService.showError(error.data.message);
            }
        }

        return (
            <div key={index} className={`col-md-5 box ${colors[index]} mb-5`}>
                <Dropdown className="float-right">
                    <Dropdown.Toggle as={CustomToggle}/>
                    <Dropdown.Menu size="sm" title="">
                        <Dropdown.Item
                            onClick={(e) => handleEdit(goal)}>
                            <i className="fa fa-edit text-black" aria-hidden="true"></i> &nbsp;Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={(e) => handleDelete(goal)}>
                            <i className="fa fa-trash text-black" aria-hidden="true"></i> &nbsp;Delete
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={(e) => handleView(goal)}>
                            <i className="fa fa-eye text-black" aria-hidden="true"></i> &nbsp;View
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div className='col-md-12'>
                    <h2>{goal.title}</h2>
                    <h4><b>{props.currency + " " + goal.total_amount.toLocaleString()}</b></h4>
                    <LinesEllipsis
                        text={goal.description}
                        maxLine='3'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                    />

                </div>
                <div className='col-md-12' id="desktopProgress">
                    <BillboardChart
                        data={{
                            columns: [
                                [item.status, progress],

                            ],
                            type: "gauge",
                        }}
                        color={color}
                        zoom={zoom}
                    />

                    <p className='text-center'>
                        <b>
                            <CalendarIcon
                            className="icon-portfolio"
                            /> 
                            {formatDateSimple(item.start_date)} - {formatDateSimple(item.end_date)}
                        </b>
                    </p>
                </div>
                <div className='col-md-6 ' id="mobileProgress">
                    <p className='text-center'>
                        <b>
                            <CalendarIcon
                            className="icon-portfolio"
                            /> 
                            {formatDateSimple(item.start_date)} - {formatDateSimple(item.end_date)}
                        </b>
                    </p>
                    <div>{item.status}</div>
                    
                    <div className="progress-light-grey progress-xlarge">
                        <div className={"progress-container " + colorClass}
                             style={{width: progress + "%"}}>{progress}%
                        </div>
                    </div>
                </div>
            </div>
        )
    }) : <div className="col-md-12"><p className="text-black text-center">No records found</p></div>;


    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        props.setSearch(string)
    }

    const formatResult = (item) => {
        // return item
        return (<p dangerouslySetInnerHTML={{__html: '<strong>' + item + '</strong>'}}></p>); //To format result as html
    }

    const handleOnClear = () => {
        // the item hovered
        props.setSearch('')
    }



    return (
        <>
            <GoalSearchForm onSearch={props.onSearch}/>
            <div className="row justify-content-start">
                <div className='col-md-4 mt-3'>
                    <div className="form-group align-item-center">
                        <label className='mr-2 pb-0'>Sort By</label>
                        <select onChange={(e) => props.setSortFields(e.target.value)
                        } name="order_by"
                                className="form-control mr-2" id="">
                            {sortFields.map(option => {
                                return <option key={option.label}
                                               value={option.field + '___' + option.order}>{option.label}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            {
                <>
                    <div className="row justify-content-start">
                        {goal_cards}
                    </div>
                    <div className="row justify-content-start">
                        {
                            props.goals?.docs?.length > 0 &&
                            <>
                                <div className='col-md-6'>
                                    <div className="form-group flex align-item-center">
                                        <label className='mr-2 pb-0'>Showing</label>
                                        <select defaultValue={props.perPage}
                                                onChange={(e) => props.setPerPage(e.target.value)}
                                                className="form-control width-25 mr-2" id="">
                                            <option value="6">6</option>
                                            <option value="12">12</option>
                                            <option value="18">18</option>
                                        </select>
                                        <label className='pb-0'>of {props.goals?.docs?.length} Records</label>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <Paginate items={props.goals} setPage={props.setPage}/>
                                </div>
                            </>
                        }
                    </div>
                </>
            }

            {
                edit &&
                <EditGoal edit={edit} setEdit={setEdit} goal={goal} onSubmitSuccess={props.onSubmitSuccess}/>
            }

            {/* end goal card */}
        </>
    );
}

export default Card;