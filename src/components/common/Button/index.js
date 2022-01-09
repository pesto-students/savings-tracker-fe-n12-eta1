

const Button = ({text, extraClass, icon=null, onClick=null, type='button'}) => {

    return (
        <>
        <button className={`btn btn-${extraClass} shadow glob-btn bg-gradient-primary`} onClick={onClick} type={type}>
            {icon}{text}
        </button>
                </>
    )


}
export default Button