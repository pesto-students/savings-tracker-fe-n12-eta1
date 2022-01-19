import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
                                                first_name: Yup.string()
                                                    .required("First Name is required")
                                                    .max(30, "First Name should be of less than 30 characters"),
                                                last_name: Yup.string()
                                                    .required("Last Name is required")
                                                    .max(30, "Last Name should be of less than 30 characters"),
                                                email: Yup.string()
                                                    .email("Please enter valid email")
                                                    .required("Email Address is required"),
                                                // phone_number: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone Number is required"),
                                                dob: Yup.string()
                                                    .required("Date of Birth is Required"),
                                                country: Yup.string().required("Country is required"),
                                                city: Yup.string().required("City is required"),
                                            });

export {validationSchema}