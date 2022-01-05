

const Button = ({text, extraClass, onClick=null, type='button'}) => {

    return (
        <>
        <button className={`btn btn-${extraClass}`} onClick={onClick} type={type}>
            {text}
        </button>
        </>
    )


}
export default Button