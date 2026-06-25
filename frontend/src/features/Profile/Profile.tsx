import { useState } from 'react';
import type { RadioChangeEvent, TabsProps } from 'antd';
import { Space, Tabs } from 'antd';
import Title from 'antd/es/typography/Title';
import { tabs } from './tabs';


const Child1 = () => {
    return (
        <div>
            <div>
                <input placeholder='user name' />
            </div>
            <div>
                <select name="" id="">
                    <option value="">role-1</option>
                </select>
            </div>
            <div>
                <switch /> active in-active user ,
            </div>
            <div>
                button for save all
            </div>
        </div>
    )
}


const Profile = () => {

    const [tabPlacement, setTabPlacement] = useState<TabsProps['tabPlacement']>('start');

    const changeTabPlacement = (e: RadioChangeEvent) => {
        setTabPlacement(e.target.value);
    };

    return (
        <>
            <Space style={{ marginBottom: 24 }}>
                <Title level={4}>User's Profile</Title>
            </Space>

            <Tabs
                tabPlacement={tabPlacement}
                items={tabs.map((item) => ({
                    label: item.label,
                    key: item.id,
                    children: item.child,
                }))}
            />
        </>
    );
};

export default Profile;