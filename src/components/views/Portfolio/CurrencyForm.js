import CurrencySelect from "../../common/CurrencySelect";
import Error from "../../common/Error";
import Button from "../../common/Button";
import Loader from "../../common/Loader";
import {saveCurrency} from "./api";
import {useState} from "react";

import {ExclamationIcon} from '@heroicons/react/solid'
import Swal from "sweetalert2";
import Alert from "../../Alert";

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

        Swal.fire({
                      title: "Confirm",
                      text: "Are you sure want to change the currency? It can have unexpected results for the existing goals' amount values. ",
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
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                saveCurrency(data).then((response) => {
                    setLoading(false);
                    Alert.showSuccess('Saved');
                }).catch(error => {
                    setLoading(false);
                    const errors = error.response?.data?.errors || [error.message];
                    setErrors(errors)

                });
            });


    };


    return <form onSubmit={handleCurrencySubmit}>
        <div className="row">
            <div className="col-6 col-md-5">
                <div className="form-group">
                    <CurrencySelect value={value}/>
                    {errors.length > 0 && <Error message={errors}/>}
                </div>
            </div>
            <div className="col">
                <div className="d-flex">
                    <Button disabled={loading} type="submit"
                            text={(<>Save <ExclamationIcon className="icon-portfolio"/></>)}
                            extraClass="primary btn-round text-white"/>
                    <Loader visible={loading}/>
                </div>

            </div>


        </div>
    </form>
}

export default CurrencyForm;