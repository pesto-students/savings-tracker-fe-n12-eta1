import React, {useState} from "react";
import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {formatDateSimple} from "../utils";
import Button from "../Button";
import Loader from "../Loader";
import moment from "moment";

export default function DatesRangePicker({start_date, end_date, onSubmitSuccess}) {

    const [startDate, setStartDate] = useState(moment(start_date).format('DD/MM/YYYY'));
    const [endDate, setEndDate] = useState(moment(end_date).format('DD/MM/YYYY'));
    /*const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);*/
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

        onSubmitSuccess(filters)
        setLoading(false);


    };
    return (
        <div className="App">
            <h5 className="mb-3">Income Vs Expenses</h5>
            <DateRangePicker
                startDate={startDate}
                startDateId="s_id"
                endDate={endDate}
                endDateId="e_id"
                onDatesChange={({startDate, endDate}) => {
                    setStartDate(startDate);
                    setEndDate(endDate);
                }}
                focusedInput={focusedInput}
                onFocusChange={e => setFocusedInput(e)}
                displayFormat="DD/MM/YYYY"
            />

            <form onSubmit={handleSubmit} className="row">
                <input type="hidden" name="start_date" value={startDate}/>
                <input type="hidden" name="end_date" value={endDate}/>
                <div>
                    <div className="d-flex">
                        <Button type="submit" text="Apply"/>
                        <Loader
                            visible={loading}/>

                    </div>

                </div>
            </form>
        </div>
    );
}


/*import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateRangePicker({start_date,end_date}) {
    const [startDate, setStartDate] = useState(start_date);
    const [endDate, setEndDate] = useState(end_date);
   
    return (
      <div>
        <DatePicker
          placeholderText="Select From Date"
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onChange={date => setStartDate(date)}
        />
        <span> to </span>
        <DatePicker
          placeholderText="Select To Date"
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          onChange={date => setEndDate(date)}
        />
      </div>
    );
}*/
