import {useState} from 'react';
import './index.css';
import React from 'react';
import image from './images/target.jpg';
import Skeleton from '../../common/Skeleton';
import Paginate from '../../common/Paginate';
const Card = ({loading}) => {
    console.log(loading)
    const [colors, setColors] = useState(['cyan', 'red', 'blue', 'orange', 'yellow', 'green'])

    return(
        <>
        {/* goal card */}
        <div className="container">
            <div className="row">
            {loading && <Skeleton totalCollections="1" />}
            { !loading &&
                <>
                <div className="col-12 box cyan mb-5">
                    <h2>Car</h2>
                    <p><b>Start Date :</b>22-04-2022</p>
                    <p><b>End Date :</b>22-04-2023</p> 
                    <p><b>Amount: 130,000</b></p>

                    <div className="btn-group mr-5" role="group">
                        <a href="#">
                        <button type="button" className="btn btn-info">View</button>
                        </a>
                    </div>
                    <img src={image} className="card-img float-right" alt="logo"/>
                </div>

                <div className="col-12 box yellow mb-5">
                <h2>Home</h2>
                <p><b>Start Date :</b>22-04-2022</p>
                <p><b>End Date :</b>22-04-2023</p> 
                <p><b>Amount: 130,000</b></p>

                <div className="btn-group mr-5" role="group">
                    <a href="#">
                    <button type="button" className="btn btn-info">View</button>
                    </a>
                </div>
                <img src={image} className="card-img float-right" alt="logo"/>
                </div>

                <div className="col-12 box red mb-5">
                <h2>Home</h2>
                <p><b>Start Date :</b>22-04-2022</p>
                <p><b>End Date :</b>22-04-2023</p> 
                <p><b>Amount: 130,000</b></p>

                <div className="btn-group mr-5" role="group">
                    <a href="#">
                    <button type="button" className="btn btn-info">View</button>
                    </a>
                </div>
                <img src={image} className="card-img float-right" alt="logo"/>
                </div>

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