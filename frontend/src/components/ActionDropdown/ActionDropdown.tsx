import { Button, Dropdown, Modal } from 'antd'
import actionIcon from '../../assets/icons/action.svg'
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/trash.svg'
import React, { useState } from 'react'
import { useToggleDrawer } from '../../hooks/useToggleDrawer';

const ActionDropdown = ({ data }) => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleDrawer = useToggleDrawer();

    const handleEdit = () => {
        toggleDrawer(true, "showDrawerEdit")
    }

    const items = [{
        key: 'edit',
        label: <div onClick={handleEdit} className='flex items-center gap-x-5'><img src={editIcon} alt="" />
            <p>edit</p></div>
    },
    {
        key: 'delete',
        label: <div onClick={() => setIsOpen(true)} className='flex items-center gap-x-5'><img src={deleteIcon} alt="" />
            <p>delete</p></div>
    }]

    return (
        <>
            <Dropdown menu={{ items }} trigger={['click']}>
                <div>
                    <img src={actionIcon} alt="" />
                </div>
            </Dropdown>

            <Modal

                open={isOpen}
                onOk={() => {
                    setIsOpen(false);
                }}
                onCancel={() => setIsOpen(false)}
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to delete this student?</p>
            </Modal>
        </>
    )
}

export default ActionDropdown