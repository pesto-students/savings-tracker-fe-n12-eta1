import {useState, useEffect} from 'react';
import DashboardBanner from '../../common/DashboardBanner';
import './index.css';
import SideBar from '../../SideBar';
import banner from './images/banner.png';
import View from './View';
import Edit from './Edit';
import {getProfile} from "./api";

const Profile = ({active}) => {

    const [edit, setEdit] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {

        getProfile().then(response => {
            const user = response.data.user;
            setUserData(user);
        });

    }, []);

    return (
        <>
            <DashboardBanner
                image={banner}
            />

            <div className="main main-raised dashoard-container">
                <div className="container">
                    <div className="row">
                        <SideBar active={active}/>

                        {
                            !edit &&
                            <View userData={userData}
                                  setEdit={setEdit}
                            />
                        }

                        {
                            edit &&
                            <Edit
                                userData={userData}
                                active={active}
                                setEdit={setEdit}
                                onSave={(data) => {
                                    setUserData(data)
                                }}
                            />
                        }

                    </div>
                </div>
            </div>

        </>
    );
};

export default Profile