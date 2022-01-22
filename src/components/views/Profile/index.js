import {useState, useEffect} from 'react';
import DashboardBanner from '../../common/DashboardBanner';
import './index.css';
import SideBar from '../../SideBar';
import banner from './images/banner.png';
import View from './View';
import Edit from './Edit';
import {getProfile} from "./api";
import Spinner from "../../common/Spinner";

const Profile = ({active}) => {

    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});

    useEffect(() => {

        getProfile().then(response => {
            const user = response.data.user;
            setUserData(user);
            setLoading(false);
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

                        {loading && <Spinner/>}
                        {
                            edit ? <Edit
                                    userData={userData}
                                    active={active}
                                    setEdit={setEdit}
                                    onSave={(data) => {
                                        setUserData(data)
                                    }}
                                /> :
                                <View userData={userData}
                                      setEdit={setEdit}
                                />
                        }

                    </div>
                </div>
            </div>

        </>
    );
};

export default Profile