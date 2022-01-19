import {useState} from 'react'
import './index.css';


const Tabs =({tabTitle, activeTab, setActiveTab})=> {
    
    let tabs = tabTitle.map((item, index) => {
        return <li key={index} className={(activeTab === item.name ? 'active' : '')}>
                    <a onClick={(e) => setActiveTab(item.name)} ><span>{item.name}</span></a>
                </li>
    });

    return (
        <ul className="tabs-header">{tabs}</ul>
    )
    
}




export default Tabs