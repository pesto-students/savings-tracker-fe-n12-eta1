import Button from "../../common/Button";

const ContactSection = () => {

    return (

        <div className="section section-contacts" id="contact-section">
                <div className="row">
                <div className="col-md-8 ml-auto mr-auto">
                    <h2 className="text-center title">Reach US</h2>
                    <h4 className="text-center description">If you want any assist, please feel free to contact us.</h4>
                    <form className="contact-form mt-4">
                    <div className="row">
                        <div className="col-md-6">
                        <div className="form-group">
                            <input type="text" placeholder="Your Name" className="form-control" />
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-group">
                            <input type="email" placeholder="Your Email Address" className="form-control" />
                        </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <textarea type="text" placeholder="Your Message" className="form-control" rows="4" id="exampleMessage"></textarea>
                    </div>
                    <div className="row">
                        <div className="col-md-4 ml-auto mr-auto text-center">
                        <Button text="Send Message" extraClass="primary btn-round text-white"/>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
    );
}
export default ContactSection;