import './index.css';

const Error = ({message}) => {

    if (Array.isArray(message)) {

        const errors = message;

        if (errors.length === 1) {
            return (
                <p className="alert-error">{message}</p>
            );
        }

        return <ul className="text-danger mt-3 text-bold">
            {errors.map(error => {
                return <li key={error}>{error}</li>
            })}
        </ul>

    }

    return (

        <p className="alert-error">{message}</p>
    );
}

export default Error;