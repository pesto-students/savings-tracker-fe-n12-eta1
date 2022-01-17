import {useState, useEffect} from 'react';
import Button from '../../common/Button';
import {getGoals} from './Api'
import SideBar from '../../SideBar';
import alertService from '../../Alert';
import Card from './Card.js';
import DashboardBanner from '../../common/DashboardBanner';
import Tabs from '../../common/Tabs/Tabs.js';
import banner from './images/target.jpg';
/*let goals_data = [
    {
        name: 'All',
        text: 'Text 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores nihil, nisi, voluptate ad quis ea omnis quidem minima fugit adipisci, porro ut velit officiis natus eligendi autem inventore dolor fuga unde nesciunt expedita, beatae officia nostrum labore. Reiciendis, commodi adipisci eius est recusandae ipsa incidunt repellat explicabo nobis corporis debitis non ullam, eos itaque, quia, iste repudiandae. Iusto numquam consectetur quo, et, quis deleniti ipsam eaque perferendis. Repellat ad, molestiae id deserunt praesentium distinctio similique nesciunt itaque. Repellat error enim blanditiis esse, odio commodi exercitationem nostrum perferendis veniam quod, recusandae provident aspernatur aliquam placeat odit cumque fugit ducimus, voluptatibus ad?'
    },
    {
        name: 'Recent',
        text: 'Text 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores perspiciatis repellat soluta dolorum, quam quos possimus atque rerum porro voluptate beatae dolor incidunt! Corporis, tempore quasi fugit est. Ex, quae!Aliquam nulla explicabo facilis, consequuntur tenetur! Rem architecto veritatis quo corporis sapiente nesciunt culpa at enim similique officiis adipisci in commodi suscipit, natus facilis, repellat laboriosam eaque obcaecati quaerat vero!'
    },
    {
        name: 'Active',
        text: 'Text 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem minus similique architecto sequi delectus non, nobis consequuntur officia, laboriosam reiciendis ea! Natus iste quas perspiciatis magnam repellat, voluptate excepturi esse.'
    },
    {
        name: 'Achieved',
        text: 'Text 4 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem minus similique architecto sequi delectus non, nobis consequuntur officia, laboriosam reiciendis ea! Natus iste quas perspiciatis magnam repellat, voluptate excepturi esse.'
    }
];*/

const List = ({active}) => {

    //const [loading, setLoading] = useState(false)
    const [state, setState] = useState(
        {
            loading:false,
            goals_data : [
                {
                    name: 'All',
                    text: 'Text 1'
                },
                {
                    name: 'Recent',
                    text: 'Text 2!'
                },
                {
                    name: 'Active',
                    text: 'Text 3 !'
                },
                {
                    name: 'Achieved',
                    text: 'Text 4!'
                }
            ]
        })

    useEffect(() => {
        //setLoading(true);
        state.loading = true
        getGoals({status:'All'}).then((response) => {

            console.log(response)
            state.goals_data = response.goals_data||null
            alertService.showSuccess(response.message);
            state.loading = false

        }).catch((error) => {
            //setLoading(false);
            state.loading = false
            alertService.showError(error.message);
        });
    }, [])

    return (
        <>

            <DashboardBanner
                image={banner}
            />
        
            <div className="main main-raised dashoard-container">
                <div className="container">
                    <div className="row">
                        <SideBar active={active}/>
                        

                        <div className="col-md-9">
                            <h1 className="font_30"><i className="fas fa-bullseye mr-2"></i>Goals</h1>
                            <Tabs data={state.goals_data} loading={state.loading}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default List;