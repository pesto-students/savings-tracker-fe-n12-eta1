import Button from '../../common/Button';
import {signOut} from "../../../auth";

const View = ({active, setEdit}) => {

    return (

        <div className="col-md-9">
            <div className="row">
                <div className="col-md-6">
                    <h1 className="font_30"><i className="fa fa-user mr-2"></i>Profile</h1>
                </div>
                <div className="col-md-6 flex">

                    <Button
                        text="Edit"
                        extraClass="primary btn-round text-white ml-auto"
                        icon={<i className="fa fa-edit mr-2"></i>}
                        onClick={(e) => setEdit(true)}
                    />
                </div>
            </div>

            <div className="row mt-4 mb-3">
                <div className="col-md-6">
                    <b>Full Name</b>
                </div>
                <div className="col-md-6">
                    Harish Patidar
                </div>
            </div>

            <div className="row mt-4 mb-3">
                <div className="col-md-6">
                    <b>Email Address</b>
                </div>
                <div className="col-md-6">
                    patidarharish08@gmail.com
                </div>
            </div>

            <div className="row mt-4 mb-3">
                <div className="col-md-6">
                    <b>Mobile Number</b>
                </div>
                <div className="col-md-6">
                    9893337046
                </div>
            </div>

            <div className="row mt-4 mb-3">
                <div className="col-md-6">
                    <b>Date of Birth</b>
                </div>
                <div className="col-md-6">
                    20 April 1995
                </div>
            </div>

            <div className="row mt-4 mb-3">
                <div className="col-md-6">
                    <b>Country</b>
                </div>
                <div className="col-md-6">
                    India
                </div>
            </div>

            <div className="row mt-4 mb-3">
                <div className="col-md-6">
                    <b>City</b>
                </div>
                <div className="col-md-6">
                    Indore
                </div>
            </div>

            <div className="row mt-4 mb-3">
                <div className="col-md-6">
                    <b>Bio</b>
                </div>
                <div className="col-md-6">
                    I'm a software engineer.
                </div>
            </div>
        </div>
    );
}

export default View;