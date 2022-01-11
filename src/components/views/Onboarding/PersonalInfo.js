import Button from "../../common/Button";

const PersonalInfo = (props) => {

    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <h5><i className="fa fa-user mr-2"></i>Personal Info</h5>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name"
                               name="name"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email"
                               name="email"/>
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="mobile" className="form-label">Mobile</label>
                        <input type="tel" className="form-control" id="mobile"
                               name="mobile"/>
                    </div>
                </div>
            </div>
            <div className="row">


                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="dob" className="form-label">Date of Birth</label>
                        <input type="date" className="form-control" id="dob"
                               name="dob"/>
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-md-6">
                    <div className="form-group">
                        <Button text="Next" extraClass="primary btn-round text-white" onClick={props.nextStep}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonalInfo;