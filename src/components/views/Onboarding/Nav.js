const Nav = (props) => {
    return <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            {[...Array(props.totalSteps)].map((val, i) => {//loop on number of steps
                const stepNumber = i + 1;
                return <li key={i} className={'breadcrumb-item ' + (props.currentStep === stepNumber ? 'active' : '')}>
                    <a
                        href="#" onClick={() => props.goToStep(stepNumber)}>Step {stepNumber}</a>
                </li>
            })}
        </ol>
    </nav>
};

export default Nav;