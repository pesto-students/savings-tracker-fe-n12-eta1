import Card from "../../views/Goals/Card";

const TabContent = (props) => {
    
    let activeClass = props.activeId;

    let content = props.data.map((item, index) => {
        return <div  className={'tabs-textItem ' + (activeClass === index ? 'show' : '')} ><p>{item.text}</p></div>
    });

    return (
        <Card loading={props.loading} data={props.data}/>
    );
    
}

export default TabContent
/*return (
    <div className="tabs-content">{content}</div>
);*/