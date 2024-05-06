import React, { useEffect, useState } from 'react'
import { DUMMY_ROLES } from '../../constants/roles'
import { DUMMY_ACCESSIBILITIES } from '../../constants/accessibilities'
import Input from '../input/Input';


function DataTable() {
    const [key, setKey] = useState(1)
    const [roles, setRoles] = useState(DUMMY_ROLES)
    const [accessibilities, setAccessibilities] = useState(DUMMY_ACCESSIBILITIES)
    const [isEditMenueOpen, setIsEditMenueOpen] = useState({ isClicked: false, elemId: "" })



    const updateRoleTitle = ({ target }) => {
        const filtered = roles.filter(role => role.id === target.id)
        const filteredIndex = roles.indexOf(filtered[0])
        const newRole = {
            id: target.id,
            title: target.value
        }
        const newRoles = roles.toSpliced(filteredIndex, 1, newRole)
        setRoles(newRoles)
    }

    const copyRole = ({ target: { id } }) => {
        const filtered = roles.filter(role => role.id === id)
        const filteredIndex = roles.indexOf(filtered[0])
        const newRole = {
            id: crypto.randomUUID(),
            title: filtered[0].title
        }
        const newRoles = roles.toSpliced(filteredIndex, 0, newRole)
        setRoles(newRoles)

    }
    const removeRole = ({ target: { id } }) => {
        setRoles(prev => prev.filter(role => role.id !== id))
    }

    const openEditMenu = ({ target: { id } }) => {
        setIsEditMenueOpen(prev => ({ isClicked: !prev.isClicked, elemId: id }))
    }

    const addRole = () => {
        const newTitle = prompt("عنوان؟")
        if (newTitle) {
            const newRole = {
                title: newTitle,
                id: crypto.randomUUID()
            }
            setRoles(prev => [newRole, ...prev])

        }
    }


    useEffect(() => {
        setKey(Math.random())
    }, [roles])


    return (
        <>
            <div className='m-3 bg-secondary-dark overflow-hidden border rounded-2xl'>
                <div className='mb-10'>
                    <p className=' text-center p-2 bg-primary-dark'>اضافه و ویرایش</p>
                </div>
                <div className='h-fit w-full overflow-x-auto'>
                    <div onClick={addRole} className='w-fit cursor-pointer -translate-x-52'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <table className='border-collapse border rounded-md w-[98%] overflow-hidden m-auto'>
                        <thead>
                            <tr className='mx-8 bg-primary-dark '>
                                <th className='px-8 py-4 border border-l-primary-red border-b-gray-600'>امکانات</th>
                                {roles.map(({ id, title }) => (
                                    <th className='px-8 py-4 border border-gray-600' >
                                        <div className='flex justify-end gap-10'>
                                            <div className='w-fit'>
                                                {/* {title} */}
                                                <Input key={key} id={id} defaultValue={title} blurHandler={updateRoleTitle} />
                                            </div>
                                            <div onClick={openEditMenu} className='relative w-fit cursor-pointer'>
                                                <svg id={id} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path id={id} stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                                    <path id={id} stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                                <div className={`${isEditMenueOpen.isClicked && isEditMenueOpen.elemId === id ? "inline-block" : "hidden"} absolute z-10 w-40 left-0 bg-secondary-dark border rounded  border-gray-200`}>
                                                    <div id={id} onClick={removeRole} className='flex justify-center items-center w-full cursor-pointer hover:bg-gray-600 border-b gap-4'>
                                                        <p id={id}>حذف</p>
                                                        <svg id={id} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path id={id} strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </div>
                                                    <div id={id} onClick={copyRole} className='flex justify-center items-center w-full cursor-pointer hover:bg-gray-600 gap-4'>
                                                        <p id={id}>کپی</p>
                                                        <svg id={id} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path id={id} strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {accessibilities.map(({ id, title }) => (
                                <tr>
                                    <th id className='px-8 py-4 text-center border font-bold text-lg border-l-primary-red border-b-gray-600 text-nowrap' >{title}</th>
                                    {roles.map(() => (
                                        <td className='px-8 py-4 text-center border border-gray-600'>
                                            <input
                                                type="checkbox"
                                                value="allowed"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default DataTable