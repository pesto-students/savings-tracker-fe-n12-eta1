import {useState, useEffect} from 'react';
import Button from "../Button";
import Loader from "../Loader";
import Error from "../Error";
import {createSubscription, verifySubscription} from "./api";


const SubscribeBtn = ({onSuccess, className = ''}) => {

    useEffect(() => {

        //razorpay script
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const [loading, setLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState(null);

    const handleSubmit = (e) => {

        setServerErrors(null);

        setLoading(true);

        createSubscription({}).then(response => {
            const data = response.data;
            const {user} = data;

            const prefill = {
                "name": user.first_name + ' ' + user.last_name,
                "email": user.email,
                "contact": user.phone_number
            };

            var options = {
                "key": process.env.REACT_APP_RAZORPAY_KEY_ID,
                subscription_id: data.razorpay_subscription_id,
                "name": "Savings Tracker",
                "description": "1 Year Subscription",
                "handler": function ({
                                         razorpay_payment_id,
                                         razorpay_subscription_id,
                                         razorpay_signature
                                     }) {

                    verifySubscription({
                                           razorpay_payment_id,
                                           razorpay_subscription_id,
                                           razorpay_signature
                                       }).then(response => {

                        setLoading(false);
                        if (response.data.success) {
                            if (onSuccess) {
                                onSuccess()
                            }
                        }

                    }).catch(handleServerError)

                },
                "modal": {
                    "ondismiss": function () {
                        setLoading(false);
                    }
                },
                "prefill": prefill,
                "theme": {
                    "color": "#e0296a"
                }
            };

            var rzp = new window.Razorpay(options);

            rzp.on('payment.failed', function (response) {
                setServerErrors('Your payment was not complete. Please try again.')
            });

            rzp.open();


        }).catch(handleServerError)

    };

    const handleServerError = (error) => {
        const errors = error.response?.data?.errors || [error.message];
        setServerErrors(errors);
        setLoading(false);
    };

    return <span className={"d-inline-block" + ' ' + className}>
        <span className="d-flex">
            <Button disabled={loading} onClick={handleSubmit} text="Subscribe"/>
            <Loader visible={loading}/>
        </span>
        {serverErrors && <Error message={serverErrors}/>}

    </span>
};


export default SubscribeBtn;