import React from 'react'

function TableData() {
    return (
        <td className='px-8 py-4 text-center border border-gray-600'>
            <input className='peer relative h-6 w-6 cursor-pointer appearance-none rounded-md border-2  border-gray-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-red-700 before:opacity-0 before:transition-opacity checked:border-primary-red checked:bg-red-700 checked:before:bg-red-700 hover:before:opacity-10 '
            type="checkbox"
            value="allowed"
            />
        </td>
    )
}

export default TableData