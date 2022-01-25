import {useState} from 'react'
import TabHeader from '../../common/Tabs/TabHeader'
import TabContent from '../../common/Tabs/TabContent'
import './index.css'



const Tabs =(props)=> {
    
    const [state,setState] = useState({
        activeTab: 0,
        data: props.data
    })
    
    const changeTabOnClick = (index) =>{
        setState({
            activeTab: index
        });
    }

    
    return (
        <div className="tabs-body">
            <TabHeader data={state.data}
                            click={changeTabOnClick}
                            activeId={state.activeTab} />
            <TabContent data={state.data} loading={props.loading}
                            activeId={state.activeTab} />
        </div>
    )
    
}




export default Tabs