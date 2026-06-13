import { Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useToggleDrawer } from '../../hooks/useToggleDrawer';

const EditDrawer = () => {

    const [openDrawer , setOpenDrawer] = useState(false);
    const location = useLocation();

    const toggleDrawer = useToggleDrawer();

    const onCloseDrawer = () => {
        toggleDrawer(false , "showDrawerEdit");
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const showDrawerParams = queryParams.get("showDrawerEdit");

        if(showDrawerParams == 'true'){
            setOpenDrawer(true);
        }
        else{
            setOpenDrawer(false);
        }
    },[location.search])

    return (
        
        <Drawer size={400} open={openDrawer} title="Edit Student" onClose={onCloseDrawer}>
            <h3 className='text-xl'>hello ant d edit</h3>
        </Drawer>
    )
}

export default EditDrawer