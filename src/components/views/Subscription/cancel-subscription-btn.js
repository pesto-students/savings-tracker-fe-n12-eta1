import {useState, useEffect} from 'react';
import {cancelSubscription} from "./api";
import Button from "../../common/Button";
import Loader from "../../common/Loader";
import Error from "../../common/Error";
import Swal from "sweetalert2";
import Alert from "../../Alert";


const CancelSubscriptionBtn = ({onSuccess, className = ''}) => {

    const [loading, setLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState(null);


    const handleSubmit = (e) => {

        setServerErrors(null);

        Swal.fire({
                      title: "Confirm",
                      text: "Are you sure want to cancel? There is no refund applicable.",
                      icon: "warning",
                      confirmButtonText: 'Yes',
                      confirmButtonColor: '#d71616',
                      showCancelButton: true,
                  })
            .then(function (result) {
                if (!result.isConfirmed) {
                    return;
                }

                setLoading(true);

                cancelSubscription().then(response => {
                    const data = response.data;
                    setLoading(false);

                    if (data.success) {
                        Alert.showSuccess('Subscription is cancelled.');
                        onSuccess();
                    }


                }).catch(handleServerError)
            });


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