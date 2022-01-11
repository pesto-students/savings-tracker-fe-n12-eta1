const Nav = (props) => {
    return (

        <div className="row text-center mb-5 lev">
            <div className="col-3 ml-auto m_auto">
            <a href="#" onClick={() => props.goToStep(1)} className={props.currentStep === 1?'level2 active':'level2'}>
                <p>1</p>
            </a>
            <h5 className={props.currentStep === 1?'mt-3 text-bold':'mt-3'}>Personal Information</h5>
            </div>
            <div className="col-3 m_auto">
            <a href="#" onClick={() => props.goToStep(2)} className={props.currentStep === 2?'level2 active':'level2'}>
                <p>2</p>
            </a>
            <h5 className={props.currentStep === 2?'mt-3 text-bold':'mt-3'}>Location Information</h5>
            </div>
            <div className="col-3 mr-auto m_auto">
            <a href="#" onClick={() => props.goToStep(3)} className={props.currentStep === 3?'level2 no_con active':'level2 no_con'}>
                <p>3</p>
            </a>
            <h5 className={props.currentStep === 3?'mt-3 text-bold':'mt-3'}>Financial Information</h5>
            </div>
        </div>
    );
    
    
    
};

export default Nav;