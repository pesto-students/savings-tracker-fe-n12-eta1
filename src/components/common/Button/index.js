

const Button = ({text, extraClass, icon=null, onClick=null, disabled='', type='button'}) => {

    return (
        <>
        <button className={`btn btn-${extraClass} shadow glob-btn bg-gradient-primary`} onClick={onClick} type={type} disabled={disabled}>
            {icon}{text}
        </button>
                </>
    )


}
export default Button