import {useState, useEffect} from 'react';
import {cancelSubscription} from "./api";
import Button from "../../common/Button";
import Loader from "../../common/Loader";
import Error from "../../common/Error";


const CancelSubscriptionBtn = ({onSuccess, className = ''}) => {

    const [loading, setLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState(null);

    const handleSubmit = (e) => {

        setServerErrors(null);

        setLoading(true);

        cancelSubscription().then(response => {
            const data = response.data;
            setLoading(false);

            if (data.success) {
                onSuccess();
            }


        }).catch(handleServerError)

    };

    const handleServerError = (error) => {
        const errors = error.response?.data?.errors || [error.message];
        setServerErrors(errors);
        setLoading(false);
    };

    return <span className={"d-inline-block" + ' ' + className}>
        <span className="d-flex">
            <Button disabled={loading} onClick={handleSubmit} text="Cancel Subscription"/>
            <Loader
                visible={loading}/>
        </span>
        {serverErrors && <Error message={serverErrors}/>}

    </span>
};


export default CancelSubscriptionBtn;