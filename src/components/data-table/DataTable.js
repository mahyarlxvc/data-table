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

    const checkBoxHandler = ({ target }) => {
        setRoles(prev => {
            prev.filter(role => role.id === target.id)[0].grantedAccessibilities[target.value] = target.checked
            return prev
        })

        // const filtered = roles.filter(role => role.id === target.id)
        // const filteredIndex = roles.indexOf(filtered[0])
        // const newRole = {
        //     id: filtered[0].id,
        //     title: filtered[0].title,
        //     grantedAccessibilities: filtered[0].grantedAccessibilities[target.value] = target.checked
        // }
        // const newRoles = roles.toSpliced(filteredIndex, 1, newRole)
        // setRoles(newRoles)

    }
    const updateRoleTitle = ({ target }) => {
        const filtered = roles.filter(role => role.id === target.id)
        const filteredIndex = roles.indexOf(filtered[0])
        const newRole = {
            id: filtered[0].id,
            title: target.value,
            value: filtered[0].value,
            grantedAccessibilities: filtered[0].grantedAccessibilities
        }
        const newRoles = roles.toSpliced(filteredIndex, 1, newRole)
        setRoles(newRoles)
    }
    const copyRole = ({ target: { id } }) => {
        const filtered = roles.filter(role => role.id === id)
        const filteredIndex = roles.indexOf(filtered[0])
        const newRole = {
            id: crypto.randomUUID(),
            title: filtered[0].title,
            value: filtered[0].value,
            grantedAccessibilities: filtered[0].grantedAccessibilities
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
        const newValue = prompt("ولیو؟")
        if (newTitle && newValue) {
            const newRole = {
                id: crypto.randomUUID(),
                title: newTitle,
                value: newValue,
                grantedAccessibilities: {
                    test1: false,
                    test2: false,
                    test3: false,
                    test4: false,
                    test5: false,
                    test6: false,
                    test7: false,
                    test8: false,
                    test9: false
                }
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
                        <table className='border-collapse outline outline-gray-700 outline-1 shadow-lg shadow-gray-950 rounded-xl w-[98%] overflow-hidden m-auto'>
                            <thead>
                                <tr className='mx-8 bg-primary-dark '>
                                    <th className='border border-l-primary-red border-b-gray-600 border-r-0 border-t-0' >
                                        <div className='relative'>
                                            <p>امکانات</p>
                                        </div>
                                    </th>

                                    {roles.map(({ id, title }) => (
                                        <th key={id} className='px-8 py-4 border border-gray-600' >
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
                                {accessibilities.map(({ id, title, value: accessibilityValue }) => (
                                    <tr key={id}>
                                        <th className='px-8 py-4 text-center border font-bold text-lg border-l-primary-red border-b-gray-600 border-r-0 border-t-0 text-nowrap' >
                                            {title}
                                        </th>
                                        {roles.map(({ id, value: roleValue }) => (
                                            < TableDataCell key={id} roleId={id} value={accessibilityValue} clickHandler={checkBoxHandler} />
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