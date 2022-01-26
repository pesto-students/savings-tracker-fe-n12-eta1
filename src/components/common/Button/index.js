const Button = ({text, extraClass = 'primary', icon = null, onClick = null, type = 'button', disabled = false, id=''}) => {

    return (
        <>
            <button id={id} disabled={disabled} className={`btn btn-${extraClass} text-white shadow glob-btn `}
                    onClick={onClick} type={type}>
                {icon}{text}
            </button>
        </>
    )


}
export default Button