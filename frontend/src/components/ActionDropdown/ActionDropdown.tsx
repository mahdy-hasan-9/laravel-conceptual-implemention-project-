import { Button, Dropdown, message, Modal } from 'antd'
import actionIcon from '../../assets/icons/action.svg'
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/trash.svg'
import React, { useState } from 'react'
import { useToggleDrawer } from '../../hooks/useToggleDrawer';
import { deleteStudentService } from '../../services/studentService';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import EditDrawerForm from '../Drawer/EditDrawerForm';
import EditDrawer from '../Drawer/EditDrawer';

const ActionDropdown = ({ data }) => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleDrawer = useToggleDrawer();
    const queryClient = useQueryClient();


    const handleEdit = () => {
        toggleDrawer(true, "showDrawerEdit", data.id)
    }


    const { mutateAsync: deleteStudent } = useMutation({
        mutationFn: deleteStudentService,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["students"],
            });
        },
        onError: (error: any) => {
            toast.error(error.message || 'Something went wrong');
        }
    })


    const hangleDelete = async (id : any) => {
        try {
            await deleteStudent(id)
            message.success('Student deleted successfully!');
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        }
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
                    hangleDelete(data.id);
                }}
                onCancel={() => setIsOpen(false)}
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to delete this student?</p>
            </Modal>
            <EditDrawer data={data}/>
        </>
    )
}

export default ActionDropdown