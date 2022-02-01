import {useState} from 'react';
import './index.css';
import React from 'react';
import image from './images/target.jpg';
import Skeleton from '../../common/Skeleton';
import { useNavigate } from 'react-router-dom';
import Paginate from '../../common/Paginate';
import BillboardChart from 'react-billboardjs';
import 'billboard.js/dist/billboard.css';
import Dropdown from "react-bootstrap/Dropdown";
import AddGoal from './AddGoal';
import EditGoal from './EditGoal';
import Button from '../../common/Button';
import Swal from 'sweetalert2';
import alertService from '../../Alert';
import {deleteGoal} from './Api.js'

const Card = (props) => {
  
    const [colors, setColors] = useState(['cyan', 'red', 'blue', 'orange', 'yellow', 'green'])
    const [loading, setEdit] = useState(false);
    const [edit, setLoading] = useState(false);
    const [goal, setGoal] = useState([]);
    const [add, setAdd] = useState(false);

    let navigate = useNavigate();
    var goal_cards = props.goals.docs.length > 0 ? props.goals.docs.map((item, index) => {
        
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


        const handleDelete = (goal) => {
            
            try{
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

                            //console.log(response)
                            
                            if(response.success === false){
                                setLoading(false)
                                alertService.showError(response.data.message);
                            }
                            props.onSubmitSuccess();
                            alertService.showSuccess(response.data.message);
                            setLoading(false);
                
                        }).catch((error) => {
                            //console.log(error)
                            setLoading(false);
                            alertService.showError(error.data.message);
                        });
                    }
                });
            }
            catch(error){
                //setLoading(false);
                //console.log(error)
                setLoading(false);
                alertService.showError(error.data.message);
            }
        }

        return (
            <div key={index} className={`col-5 box ${colors[index]} mb-5`}>
                <Dropdown className="float-right">
                    <Dropdown.Toggle as={CustomToggle}/>
                    <Dropdown.Menu size="sm" title="">
                        <Dropdown.Item 
                            onClick={(e) => handleEdit(item)}>
                            <i className="fa fa-edit text-black" aria-hidden="true"></i> &nbsp;Edit
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onClick={(e) => handleDelete(item)}>
                            <i className="fa fa-trash text-black" aria-hidden="true"></i> &nbsp;Delete
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onClick={(e) => handleView(item)}>
                            <i className="fa fa-eye text-black" aria-hidden="true"></i> &nbsp;View
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div className='col-12'>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <h4><b>{props.currency+" "+item.total_amount}</b></h4>
                </div>
                <div className='col-12'>
                    <BillboardChart
                        data={CHART_DATA}
                        color={color}
                        zoom={zoom}
                    />

                    <p className='text-center'><b>From :</b> {item.start_date} <b> &nbsp;To :</b> {item.end_date}</p>
                </div>
            </div>
        )
    }) : <div className="col-12"><p className="text-black text-center">No records found</p></div>;
    //console.log(goal_cards)    
    return (
        <>
            {/* goal card */}
            <div className="container">
                <div className='row'>
                    <div className="col-12 mt-3 mb-3">
                        <Button onClick={(e) => setAdd(true)} type="submit" text="Add Goal"
                                extraClass="primary btn-lg btn-round text-white float-right"/>
                    </div>
                </div>
                <div className='row bg-grey'>
                    <div className='col-4 mt-3'>
                        <div className="form-group align-item-center">
                            <label className='mr-2 pb-0'>Search</label>
                            <input value={props.search} onChange={(e) => props.setSearch(e.target.value)} name="search" type="text"
                                   placeholder="Search" className="form-control"/>

                        </div>
                    </div>

                    <div className='col-3 mt-3'>
                        <div className="form-group align-item-center">
                            <label className='mr-2 pb-0'>Start Date</label>
                            <input value={props.start_date} onChange={(e) => props.setStartDate(e.target.value)} name="start_date" type="date"
                                   placeholder="start date" className="form-control"/>
                        </div>
                    </div>

                    <div className='col-3 mt-3'>
                        <div className="form-group align-item-center">
                            <label className='mr-2 pb-0'>End Date</label>
                            <input value={props.end_date} onChange={(e) => props.setEndDate(e.target.value)} name="end_date" type="date"
                                   placeholder="end date" className="form-control"/>
                        </div>
                    </div>

                    <div className="col-2 mt-3  align-item-center flex">
                        <Button onClick={props.onSubmitSuccess} type="submit" text="Search"
                                extraClass="primary btn-lg btn-round text-white"/>
                    </div>
                </div>
                <div className="row">
                    <div className='col-3 mt-3'>
                        <div className="form-group align-item-center">
                            <label className='mr-2 pb-0'>Sort By</label>
                            <select defaultValue={props.orderBy} 
                                onChange={(e) => props.setOrderBy(e.target.value)} name="order_by" className="form-control mr-2" id="">
                                <option value="title">Title</option>
                                <option value="start_date">Date</option>
                                <option value="total_amount">Amount</option>
                            </select>
                        </div>
                    </div>

                    <div className='col-3 mt-3'>
                        <div className="form-group align-item-center">
                            <label className='mr-2 pb-0'>Order By</label>
                            <select defaultValue={props.sortBy} 
                                onChange={(e) => props.setSortBy(e.target.value)} name="sort_by" className="form-control mr-2" id="">
                                <option value="asc">Asc</option>
                                <option value="desc">Desc</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-6 mt-3'></div>
                </div>
                <div className="row">
                    {goal_cards}
                </div>
                <div className="row">
                    {
                        props.goals.docs.length > 0 &&
                        <>
                            <div className='col-6'>
                                <div className="form-group flex align-item-center">
                                    <label className='mr-2 pb-0'>Showing</label>
                                    <select defaultValue={props.perPage}
                                            onChange={(e) => props.setPerPage(e.target.value)}
                                            className="form-control width-25 mr-2" id="">
                                        <option value="6">6</option>
                                        <option value="12">12</option>
                                        <option value="18">18</option>
                                    </select>
                                    <label className='pb-0'>of 20 Records</label>
                                </div>
                            </div>
                            <div className='col-6'>
                                <Paginate items={props.goals} setPage={props.setPage}/>
                            </div>
                        </>
                    }
                </div>

                {
                    add && <AddGoal add={add} setAdd={setAdd} onSubmitSuccess={props.onSubmitSuccess}/>
                }

                {
                    edit && <EditGoal edit={edit} setEdit={setEdit} goal={goal} onSubmitSuccess={props.onSubmitSuccess}/>
                }
            </div>
            {/* end goal card */}
        </>
    );
}

export default Card;