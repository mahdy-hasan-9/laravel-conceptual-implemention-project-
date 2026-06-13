import { Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useToggleDrawer } from '../../hooks/useToggleDrawer';
import AddDrawerForm from './AddDrawerForm';

const AddDrawer = () => {

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const location = useLocation();

    const toggleDrawer = useToggleDrawer();

    const onCloseDrawer = () => {
        toggleDrawer(false, "showDrawerAdd");
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const showDrawerParams = queryParams.get("showDrawerAdd");

        if (showDrawerParams == 'true') {
            setOpenDrawer(true);
        }
        else {
            setOpenDrawer(false);
        }
    }, [location.search])

    return (

        <Drawer size={400} open={openDrawer} title="Add Student" onClose={onCloseDrawer}>
            <AddDrawerForm setOpenDrawer={setOpenDrawer} />
        </Drawer>
    )
}

export default AddDrawer