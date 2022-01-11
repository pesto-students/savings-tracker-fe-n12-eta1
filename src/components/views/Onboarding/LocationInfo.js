import Button from "../../common/Button";

const LocationInfo = (props) => {

    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <h5><i className="fas fa-map-marker-alt"></i> &nbsp;Location Info</h5>
                </div>
            </div>
            <div className="row">

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="country" className="form-label">Country</label>
                        <input type="text" className="form-control" id="country"
                               name="country"/>
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city"
                               name="city"/>
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="bio" className="form-label">Bio</label>
                        <textarea type="text" className="form-control" id="bio"
                                  name="bio"></textarea>
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-md-6">
                    <div className="form-group">
                        <Button text="Go Back" extraClass=" me-3 primary btn-round text-white"
                                onClick={props.previousStep}/>

                        <Button text="Next" extraClass="primary btn-round text-white" onClick={props.nextStep}/>
                    </div>
                </div>
            </div>

        </>
    );

};

export default LocationInfo;