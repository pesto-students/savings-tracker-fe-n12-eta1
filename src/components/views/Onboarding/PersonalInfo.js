import Button from "../../common/Button";

const PersonalInfo = (props) => {

    return <div className="g-3">
        <div className="row mb-3">
            <div className="col-md-3">
                <h4>Personal Info</h4>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-3"><label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name"
                       name="name"/>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-3"><label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email"
                       name="email"/>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-3"><label htmlFor="mobile" className="form-label">Mobile</label>
                <input type="tel" className="form-control" id="mobile"
                       name="mobile"/>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-3"><label htmlFor="dob" className="form-label">Date of Birth</label>
                <input type="date" className="form-control" id="dob"
                       name="dob"/>
            </div>
        </div>
       

        <div className="row mb-3">
            <div className="col-md-3">
                <Button text="Next" extraClass="primary btn-round text-white" onClick={props.nextStep}/>
            </div>
        </div>

    </div>
};

export default PersonalInfo;