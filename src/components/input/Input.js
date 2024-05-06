
function Input({ id, type, defaultValue, blurHandler }) {
    return (
        <input
            id={id}
            type={type}
            defaultValue={defaultValue}
            onBlur={blurHandler}
            className='bg-inherit text-center w-40'
        />
    )
}

export default Input