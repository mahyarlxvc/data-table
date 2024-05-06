
function Input({ id, defaultValue, blurHandler }) {
    return (
        <input
            id={id}
            type='text'
            defaultValue={defaultValue}
            onBlur={blurHandler}
            className='bg-inherit text-center w-40'
        />
    )
}

export default Input