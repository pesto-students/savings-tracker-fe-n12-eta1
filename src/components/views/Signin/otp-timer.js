import {useState, useEffect} from 'react';

const OTPResendButton = ({count, onDone, onClick}) => {
    const [currentCount, setCount] = useState(count);
    const timer = () => setCount(currentCount - 1);

    useEffect(
        () => {
            if (currentCount <= 0) {
                onDone();
                return;
            }
            const id = setInterval(timer, 1000);
            return () => clearInterval(id);
        },
        [currentCount, count]
    );

    return <div>
        <button onClick={() => {
            setCount(count);
            onClick()
        }} disabled={currentCount !== 0} type="button" className="btn btn-link small">Resend
            OTP
        </button>
        {currentCount !== 0 && <span className="small"> in {currentCount} seconds</span>}
    </div>
};


export default OTPResendButton