import Button from "../../common/Button";
import React from "react";


const GoalSearchForm = ({onSearch}) => {

    const onSubmit = (e) => {
        e.preventDefault();

        const form = e.target;

        const {query, start_date, end_date} = form;

        onSearch({query: query.value, start_date: start_date.value, end_date: end_date.value});

    };

    return <form className='row bg-grey justify-content-start' onSubmit={onSubmit}>
        <div className='col-md-4 mt-3'>
            <div className="form-group align-item-center">
                <label className='mr-2 pb-0'>Search</label>
                <input name="query" type="text"
                       placeholder="Search" className="form-control"/>
            </div>
        </div>

        <div className='col-md-3 mt-3'>
            <div className="form-group align-item-center">
                <label className='mr-2 pb-0'>Start Date</label>
                <input name="start_date" type="date"
                       placeholder="Start date" className="form-control"/>
            </div>
        </div>

        <div className='col-md-3 mt-3'>
            <div className="form-group align-item-center">
                <label className='mr-2 pb-0'>End Date</label>
                <input name="end_date" type="date"
                       placeholder="End date" className="form-control"/>
            </div>
        </div>

        <div className="col-md-2 mt-3  align-item-center flex">
            <Button
                type="submit"
                text="Search"
                extraclassName="primary btn-lg btn-round text-white"/>
        </div>
    </form>

}

export default GoalSearchForm