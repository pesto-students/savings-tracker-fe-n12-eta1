import {useState} from 'react';
import {Formik, Form, Field} from "formik";
import Modal from 'react-bootstrap/Modal';
import * as Yup from "yup";
import Button from '../../common/Button';
import Error from '../../common/Error';
import {addGoal} from './Api'
import alertService from '../../Alert';
import Loader from "../../common/Loader";
import CapitalizeText from "../../common/CapitalizeText";

const AddGoal = ({add, setAdd, onSubmitSuccess}) => {

    const [loading, setLoading] = useState(false);

    const initialValues = {
        title: '',
        description: '',
        end_date: '',
        total_amount: '',
    };

    const validationSchema = Yup.object().shape({
                                                    title: Yup.string()
                                                        .required("Goal title is required")
                                                        .max(30, "Goal title should be of less than 30 characters"),
                                                    description: Yup.string()
                                                        .required("Goal description is required")
                                                        .max(500, "Goal description should be of less than 500 characters"),
                                                    end_date: Yup.string().required("Target Date is required"),
                                                    total_amount: Yup.string().required("Amount is required"),
                                                });

    const handleSubmit = async (_formInput) => {
        setLoading(true)

        try {
            const formData = new FormData();

            formData.append('total_amount', _formInput.total_amount);
            formData.append('description', _formInput.description);
            formData.append('title', _formInput.title);
            formData.append('end_date', _formInput.end_date);

            const data = Object.fromEntries(formData);

            addGoal(data).then((response) => {

                alertService.showSuccess(response.data.message);
                onSubmitSuccess();
                setLoading(false);

            }).catch((error) => {
                console.log(error)
                setLoading(false);
                alertService.showError(error.data.message);
            });

        }
        catch (err) {
            console.log(err)
            setLoading(false)
        }

    };

    return (
        <>
            <Modal
                size="md"
                show={add}
                onHide={() => {
                    setAdd(false);
                }
                }
                aria-labelledby="signin-modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="signin-modal-title">
                        Add Goal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        // enableReinitialize
                    >
                        {({isValid, errors, values}) => (
                            <Form autoComplete="off">
                                <div className="col-md-12">
                                    <div className="form-group">

                                        <label>Goal Title</label>
                                        <Field name="title" type="text"
                                               placeholder="Enter Goal Title" className="form-control capitalize"/>
                                        {
                                            errors.title && <Error message={errors.title}/>
                                        }
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>description</label>
                                        <Field as="textarea" name="description" type="text"
                                               placeholder="Enter Goal description"
                                               className="form-control capitalize" rows="4"
                                        />
                                        {
                                            errors.description && <Error message={errors.description}/>
                                        }
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group">

                                        <label>Target Date</label>
                                        <Field name="end_date" type="date"
                                               className="form-control"/>
                                        {
                                            errors.end_date && <Error message={errors.end_date}/>
                                        }
                                    </div>
                                </div>


                                <div className="col-md-12">
                                    <div className="form-group">

                                        <label>Amount</label>
                                        <Field name="total_amount" type="number"
                                               placeholder="Enter total_amount" className="form-control"/>
                                        {
                                            errors.total_amount && <Error message={errors.total_amount}/>
                                        }
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 ml-auto mr-auto text-center">
                                        <Button disabled={!isValid} type="submit" text="Add Goal"
                                                extraClass="primary btn-round text-white"/>
                                        <Loader
                                            visible={loading}/>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddGoal;