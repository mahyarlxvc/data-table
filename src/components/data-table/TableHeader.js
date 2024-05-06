import React from 'react'
import Input from '../input/Input'

function TableHeader({ key, id, title, blurHandler, }) {
    return (
        <div className='w-fit'>
            <Input key={key} id={id} type="text" defaultValue={title} blurHandler={blurHandler} />
        </div>
    )
}

export default TableHeader