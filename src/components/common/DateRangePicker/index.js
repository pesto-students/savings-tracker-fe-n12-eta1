import React, { useState } from "react";
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Button from "../Button";
import Loader from "../Loader";
import moment from "moment";

export default function DatesRangePicker({start_date,end_date,onSubmitSuccess}) {
    //start_date = moment(start_date)
    //start_date = 
    const [startDate, setStartDate] = useState(moment(start_date));
    const [endDate, setEndDate] = useState(moment(end_date));
    const [focusedInput, setFocusedInput] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        setLoading(true);
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        if (data) {
            handleResponse(data)
        }
    };

    const handleResponse = (filters) => {
        console.log(filters,'handleResponse')
        //if(onSubmitSuccess(filters)){
            onSubmitSuccess(filters)
            setLoading(false);
        //}
        
    };
    return(
        <div className="row mt-6">
            <div className=" col-md-5">
                <h5 className="mb-3">Income Vs Expense</h5>
            </div>
            
            <div className="col-md-8">
                <DateRangePicker 
                    startDate={startDate}
                    startDateId="s_id"
                    endDate={endDate}
                    endDateId="e_id"
                    onDatesChange={({ startDate, endDate }) => { setStartDate(startDate); setEndDate(endDate); }}
                    focusedInput={focusedInput}
                    onFocusChange={e => setFocusedInput(e)}
                    displayFormat="DD/MM/YYYY"

                />
            </div>
            <div className="col-4">
                <form onSubmit={handleSubmit} >
                    <input type="hidden" name="start_date" value={startDate}/>
                    <input type="hidden" name="end_date" value={endDate}/>          
                    <Button type="submit" text="Apply"/>
                    <Loader visible={loading}/>
                </form>   
            </div>
            
        </div>
    )

}