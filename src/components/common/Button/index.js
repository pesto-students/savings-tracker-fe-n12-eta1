const Button = ({text, extraClass, icon = null, onClick = null, type = 'button', disabled = false}) => {

    return (
        <>
            <button disabled={disabled} className={`btn btn-${extraClass} shadow glob-btn bg-gradient-primary`}
                    onClick={onClick} type={type}>
                {icon}{text}
            </button>
        </>
    )


}
export default Button