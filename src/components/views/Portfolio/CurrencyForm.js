import CurrencySelect from "../../common/CurrencySelect";
import Error from "../../common/Error";
import Button from "../../common/Button";
import Loader from "../../common/Loader";
import {saveCurrency} from "./api";
import {useState} from "react";

const CurrencyForm = ({value, onSave}) => {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCurrencySubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        if (form.currency.value === '') {
            setErrors(['Currency Value is required']);
            return;
        }

        setLoading(true);
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        saveCurrency({}).then((response) => {
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            const errors = error.response?.data?.errors || [error.message];
            setErrors(errors)

        });
    };
    return <form onSubmit={handleCurrencySubmit}>
        <div className="row">
            <div className="col-md-5 col-sm-9">
                <div className="form-group">
                    <CurrencySelect value={value}/>
                    {errors.length > 0 && <Error message={errors}/>}
                </div>
            </div>
            <div className="col">
                <div className="d-flex">
                    <Button disabled={loading} type="submit" text="Save"
                            extraClass="primary btn-round text-white"/>
                    <Loader visible={loading}/>
                </div>

            </div>


        </div>
    </form>
}

export default CurrencyForm;