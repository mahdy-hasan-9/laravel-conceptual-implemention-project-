import { Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useToggleDrawer } from '../../hooks/useToggleDrawer';
import EditDrawerForm from './EditDrawerForm';

const EditDrawer = () => {

    const [openDrawer, setOpenDrawer] = useState(false);
    const location = useLocation();

    const toggleDrawer = useToggleDrawer();

    const onCloseDrawer = () => {
        toggleDrawer(false, "showDrawerEdit");
    }


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const showDrawerParam = queryParams.get("showDrawerEdit");

        if (
            showDrawerParam?.split("-")[0] === "true" 
            // showDrawerParam?.split("-")[1] === String(data?.id)
        ) {
            setOpenDrawer(true);
        } else {
            setOpenDrawer(false);
        }
    }, [location.search]);





    return (

        <Drawer size={400} open={openDrawer} title="Edit Student" onClose={onCloseDrawer}>
            <EditDrawerForm />
        </Drawer>
    )
}

export default EditDrawer