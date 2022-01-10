import Button from "../../common/Button";

const LocationInfo = (props) => {

    return <div className="g-3">
        <div className="row mb-3">
            <div className="col-md-3">
                <h4>Location Info</h4>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-3"><label htmlFor="country" className="form-label">Country</label>
                <input type="text" className="form-control" id="country"
                       name="country"/>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-3"><label htmlFor="city" className="form-label">City</label>
                <input type="text" className="form-control" id="city"
                       name="city"/>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-3"><label htmlFor="bio" className="form-label">Bio</label>
                <textarea type="text" className="form-control" id="bio"
                          name="bio"></textarea>
            </div>
        </div>

        <div className="row mb-3">
            <div className="col-md-3">
                <Button text="Go Back" extraClass=" me-3 primary btn-round text-white" onClick={props.previousStep}/>

                <Button text="Next" extraClass="primary btn-round text-white" onClick={props.nextStep}/>
            </div>
        </div>

    </div>
};

export default LocationInfo;