import {useState} from 'react'
import './index.css';

const Tabs =({tabTitle, activeTab, setActiveTab})=> {
    const style = {color:"#2e3440"}
    let tabs = tabTitle.map((item, index) => {
        return <li key={index} className={(activeTab === item.name ? 'active' : '')}>
                    <a onClick={(e) => setActiveTab(item.name)} ><span style= {style}>{item.name}</span></a>
                </li>
    });
    return (
        <ul className="tabs-header">{tabs}</ul>
    )
}
export default Tabs