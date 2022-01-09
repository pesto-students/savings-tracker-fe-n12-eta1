import Button from "../../common/Button";
import {useState} from 'react'
import submitContactForm from '../../../actions/contactAction'

const ContactSection = () => {

    const [contactform,setState] = useState({
        fields: {},
        errors: {},
        success:false
      })

    const handleValidation  =(e)=>{
        let fields = contactform.fields;
        let errors = {};
        let formIsValid = true;

        if(typeof contactform.fields==='undefined'){
            errors["name"] = "Cannot be empty";
            errors["email"] = "Cannot be empty";
            errors["message"] = "Cannot be empty";
            setState({ errors: errors,fields:fields });
            return false
        }

        //Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["name"] = "Only letters";
            }
        }

        //Email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf("@");
            let lastDotPos = fields["email"].lastIndexOf(".");

            if (
                !(
                lastAtPos < lastDotPos &&
                lastAtPos > 0 &&
                fields["email"].indexOf("@@") == -1 &&
                lastDotPos > 2 &&
                fields["email"].length - lastDotPos > 2
                )
            ) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        //Email
        if (!fields["message"]) {
            formIsValid = false;
            errors["message"] = "Cannot be empty";
        }

        setState({ errors: errors,fields:fields });
        return formIsValid;
    }

    const contactSubmit =(e) =>{
        e.preventDefault();    
        if (handleValidation()) {
            submitContactForm().then(response => {         
                console.log(response)  
                contactform.success = response                  
            })
            
        } else {
          console.log(contactform)
          //alert("Form has errors.");
        }
      }
    
    const handleChange = (e) =>{
        let fields = contactform.fields;
        fields[e.target.name] = e.target.value;
        setState({ fields,success:false });
      }

    return (

        <div className="section section-contacts" id="contact-section">
            <div className="row">
                <div className="col-md-8 ml-auto mr-auto">
                    <h2 className="text-center title">Reach US</h2>

                    <h4 className="text-center description">If you want any assistance, please feel free to contact us.</h4>
                    <form className="contact-form mt-4" onSubmit={contactSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input name="name" value={contactform.name} type="text" onChange={handleChange} placeholder="Your Name" className="form-control" />
                                    {(typeof contactform.errors!=='undefined' && contactform.errors["name"]!=='undefined')?
                                    <span style={{ color: "red" }}>{contactform.errors["name"]}</span>:''
                                    }
                                </div>
                                
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input name="email" value={contactform.email} type="email" onChange={handleChange} placeholder="Your Email Address" className="form-control" />
                                    {(typeof contactform.errors!=='undefined' && contactform.errors["email"]!=='undefined')?
                                    <span style={{ color: "red" }}>{contactform.errors["email"]}</span>:''
                                    }
                                </div>
                        
                            </div>

                        </div>
                    <div className="form-group">
                        <textarea name="message" value={contactform.message} type="text" placeholder="Your Message" className="form-control" rows="4" id="exampleMessage" onChange={handleChange}></textarea>
                        {(typeof contactform.errors!=='undefined' && contactform.errors["message"]!=='undefined')?
                            <span style={{ color: "red" }}>{contactform.errors["message"]}</span>:''
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-4 ml-auto mr-auto text-center">
                        <Button type="submit" text="Send Message" extraClass="primary btn-round text-white"/>
                        </div>
                    </div>
                    </form>
                </div>
                {(typeof contactform!=='undefined' && typeof contactform.success!=='undefined' && contactform.success)?
                    <span style={{ color: "green" }}>Successfully Submitted</span>:''
                }
            </div>
        </div>
    );
}
export default ContactSection;