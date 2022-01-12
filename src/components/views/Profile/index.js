import {useState} from 'react';
import DashboardBanner from '../../common/DashboardBanner';
import './index.css';
import SideBar from '../../SideBar';
import banner from './images/banner.png';
import View from './View';
import Edit from './Edit';

const Profile = ({active}) => {

    const [edit, setEdit] = useState(false);

    return (
        <>
            

            <div className="main main-raised dashoard-container">
                <div className="container">
                    <div className="row">
                        <SideBar active={active}/>

                        {
                            !edit &&
                            <View
                                setEdit={setEdit}
                            />
                        }

                        {
                            edit &&
                            <Edit
                                active={active}
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