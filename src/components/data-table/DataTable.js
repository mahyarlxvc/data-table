import React, { useEffect, useState } from 'react'
import { DUMMY_ROLES } from '../../constants/roles'
import { DUMMY_ACCESSIBILITIES } from '../../constants/accessibilities'
import TableHeader from './TableHeader';
import HeaderEditMenu from './HeaderEditMenu';
import CreateHeaderBtn from './CreateHeaderBtn';
import TableDataCell from './TableDataCell';


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

    const toggleEditMenu = ({ target: { id } }) => {
        setIsEditMenueOpen(prev => ({ isClicked: !prev.isClicked, elemId: id }))
    }


    const createRole = () => {
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
                <div className='h-fit  m-auto '>
                    <div className='relative w-full py-2 pt-6 px-2 overflow-x-scroll'>
                        <CreateHeaderBtn createHeaderHandler={createRole} />
                        <table className='border-collapse border rounded-md w-[98%] overflow-hidden m-auto'>
                            <thead>
                                <tr className='mx-8 bg-primary-dark '>
                                    <th className='border border-l-primary-red border-b-gray-600'>
                                        <div className='relative'>
                                            <p>امکانات</p>
                                        </div>
                                    </th>

                                    {roles.map(({ id, title }) => (
                                        <th className='px-8 py-4 border border-gray-600' >
                                            <div className='flex justify-center'>
                                                <TableHeader key={key} id={id} title={title} blurHandler={updateRoleTitle} />
                                                <HeaderEditMenu
                                                    clickHandler={toggleEditMenu}
                                                    mouseLeaveHandler={toggleEditMenu}
                                                    id={id}
                                                    isMenuVisible={isEditMenueOpen.isClicked && isEditMenueOpen.elemId === id}
                                                    removeHandler={removeRole}
                                                    copyHandler={copyRole}
                                                />
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {accessibilities.map(({ id, title }) => (
                                    <tr>
                                        <th id className='px-8 py-4 text-center border font-bold text-lg border-l-primary-red border-b-gray-600 text-nowrap' >
                                            {title}
                                        </th>
                                        {roles.map(() => (
                                            <TableDataCell />
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DataTable