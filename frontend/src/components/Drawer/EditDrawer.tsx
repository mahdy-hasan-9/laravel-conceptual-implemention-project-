
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import EditDrawerForm from './EditDrawerForm';

const EditDrawer = () => {
    const { permissions } = useContext(AuthContext);
    const permission = permissions.includes('create-student');

    return (
        <>
            {permission ? <EditDrawerForm /> : <div>
                {/* <img src="https://i.programmerhumor.io/2023/10/programmerhumor-io-programming-memes-a1a4ba63f708cba.png" alt="" /> */}
            </div>}
        </>
    )
}

export default EditDrawer