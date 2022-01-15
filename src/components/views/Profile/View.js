import Button from '../../common/Button';

import {formatDob} from './utils';

const View = ({active, setEdit, userData}) => {

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
                    {userData?.first_name} {userData?.last_name}
                </div>
            </div>

            <div className="row mt-4 mb-3">
                <div className="col-md-6">
                    <b>Email Address</b>
                </div>
                <div className="col-md-6">
                    {userData?.email}
                </div>
            </div>

            <div className="row mt-4 mb-3">
                <div className="col-md-6">
                    <b>Phone Number</b>
                </div>
                <div className="col-md-6">
                    {userData?.phone_number}
                </div>
            </div>

            <div className="row mt-4 mb-3">
                <div className="col-md-6">
                    <b>Date of Birth</b>
                </div>
                <div className="col-md-6">
                    {formatDob(userData.dob)}
                </div>
            </div>

            <div className="row mt-4 mb-3">
                <div className="col-md-6">
                    <b>Country</b>
                </div>
                <div className="col-md-6">
                    {userData?.country}
                </div>
            </div>

            <div className="row mt-4 mb-3">
                <div className="col-md-6">
                    <b>City</b>
                </div>
                <div className="col-md-6">
                    {userData?.city}

                </div>
            </div>

            <div className="row mt-4 mb-3">
                <div className="col-md-6">
                    <b>Bio</b>
                </div>
                <div className="col-md-6">
                    {userData?.bio}
                </div>
            </div>
        </div>
    );
}

export default View;