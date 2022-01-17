const TabHeader =(props)=> {
    const doClick = (index, event) =>{
        props.click(index);
    }

    let activeClass = props.activeId;

    let tabs = props.data.map((item, index) => {
        return <li className={(activeClass === index ? 'active' : '')}>
                    <a onClick={doClick.bind} ><span>{item.name}</span></a>
                </li>
    });

    return (
        <ul className="tabs-header">{tabs}</ul>
    )
    

}

export default TabHeader