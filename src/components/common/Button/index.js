

<<<<<<< HEAD
const Button = ({text, extraClass, onClick=null, type='button'}) => {

    return (
        <>
        <button className={`btn btn-${extraClass}`} onClick={onClick} type={type}>
            {text}
        </button>
=======
const Button = ({text, extraClass, icon=null, onClick=null, type='button'}) => {

    return (
        <>
        <button className={`btn btn-${extraClass} shadow glob-btn bg-gradient-primary`} onClick={onClick} type={type}>
            {icon}{text}
        </button>
        
>>>>>>> origin/feature/landing-page
        </>
    )


}
export default Button