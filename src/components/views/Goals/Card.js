import {useState} from 'react';
import './index.css';
import React from 'react';
import image from './images/target.jpg';
import Skeleton from '../../common/Skeleton';
import Paginate from '../../common/Paginate';
const Card = (props) => {
    
    const [colors, setColors] = useState(['cyan', 'red', 'blue', 'orange', 'yellow', 'green'])
    var goal_cards = props.data.map((item, index) => {
        return(       
                <div className="col-12 box cyan mb-5">
                    <h2>{item.title}</h2>
                    <p><b>Start Date :</b>{item.start_date}</p>
                    <p><b>End Date :</b>{item.end_date}</p> 
                    <p><b>Amount: {item.amount}</b></p>

                    <div className="btn-group mr-5" role="group">
                        <a href="#">
                        <button type="button" className="btn btn-info">View</button>
                        </a>
                    </div>
                    <img src={image} className="card-img float-right" alt="logo"/>
                </div>
            )
        });
    //console.log(goal_cards)    
    return(
        <>
        {/* goal card */}
        <div className="container">
            <div className="row">
            {props.loading && <Skeleton totalCollections="1" />}
            { !props.loading &&
                <>
                { goal_cards }

                <div className='col-3'>
                <div className="form-group">
                    <select className="form-control" id="">
                    <option>3</option>
                    <option>5</option>
                    <option>10</option>
                    </select>
                </div>
                </div>
                <div className='col-6 offset-3'>
                    <Paginate />
                </div>
                </>
            }
            </div>
        </div>
        {/* end goal card */}
        </>
    );
}

export default Card;