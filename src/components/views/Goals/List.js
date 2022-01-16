import {useState, useEffect} from 'react';
import Button from '../../common/Button';
import {getGoals} from './Api'
import SideBar from '../../SideBar';
import alertService from '../../Alert';
import Card from './Card.js';

const List = ({active}) => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);

          getGoals().then((response) => {

            console.log(response)
            alertService.showSuccess(response.message);
        }).catch((error) => {
            setLoading(false);
            alertService.showError(error.message);
        });
    }, [])

    return (
        <>
        
            <div className="main main-raised dashoard-container">
                <div className="container">
                    <div className="row">
                        <SideBar active={active}/>

                        <div className="col-md-9">
                            <h1 className="font_30"><i className="fas fa-bullseye mr-2"></i>Goals</h1>
                            
                            <Card loading={loading} />    
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default List;