import {useState} from 'react';
import { Formik, Form, Field } from "formik";
import Modal from 'react-bootstrap/Modal';
import * as Yup from "yup";
import Button from '../../common/Button';
import Error from '../../common/Error';

const AddGoal = ({add, setAdd}) => {

    const [loading, setLoading] = useState(false);

    const initialValues = {
        title: '',
        description: '',
        end_date: '',
        amount: '',
      };
      
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required("Goal title is required")
            .max(30, "Goal title should be of less than 30 characters"),
        description: Yup.string()
            .required("Goal desccription is required"),
        end_date: Yup.string().required("Deadline is required"),
        amount: Yup.string().required("Amount is required"),
    });

    const handleSubmit = async (_formInput) => {
        setLoading(true)

        try{
            console.log(_formInput)

        }
        catch(err){
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
            {({ isValid, errors }) => (
            <Form autoComplete="off">
                <div className="col-md-12">
                    <div className="form-group">

                        <label>Goal Title</label>
                        <Field name="title" type="text"
                            placeholder="Enter Goal Title" className="form-control"/>
                        {
                            errors.title && <Error message={errors.title}/>
                        }
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form-group">
                        <label>description</label>
                        <Field as="textarea" name="description" type="text" placeholder="Enter Goal description"
                                    className="form-control" rows="4"
                                />
                        {
                            errors.description && <Error message={errors.description}/>
                        }
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form-group">

                        <label>Deadline</label>
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
                        <Field name="amount" type="number"
                            placeholder="Enter Amount" className="form-control"/>
                        {
                            errors.amount && <Error message={errors.amount}/>
                        }
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 ml-auto mr-auto text-center">
                        <Button disabled={!isValid} type="submit" text="Update Goal"
                                extraClass="primary btn-round text-white"/>

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