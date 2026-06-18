import React, { Children, useState } from 'react';
import type { RadioChangeEvent, TabsProps } from 'antd';
import { Input, Radio, Space, Tabs } from 'antd';
import Title from 'antd/es/typography/Title';
import Item from 'antd/es/list/Item';
import ProfileInfo from './ProfileInfo';


const Child1 = () => {
    return (
        <div>
            <div>
                <input placeholder='user name'/>
            </div>
            <div>
                <select name="" id="">
                    <option value="">role-1</option>
                </select>
            </div>
            <div>
                <switch/> active in-active user , 
            </div>
            <div>
                button for save all 
            </div>
        </div>
    )
}



const Child2 = () => {
    return (
        <div>
            <div>
                <Input label="Api key"/>
            </div>
        </div>
    )
}


const Profile = () => {
    const [tabPlacement, setTabPlacement] = useState<TabsProps['tabPlacement']>('start');

    const changeTabPlacement = (e: RadioChangeEvent) => {
        setTabPlacement(e.target.value);
    };

    const tabs = [
        {
            id: 1,
            label: "Basic Information",
            child: <ProfileInfo />
        },
        {
            id: 2,
            label: "Advanced",
            child: <Child2 />
        },
    ]


    return (
        <>
            <Space style={{ marginBottom: 24 }}>
                <Title level={4}>User's Profile</Title>
            </Space>
            {/* <Tabs
                tabPlacement={tabPlacement}
                items={Array.from({ length: 3 }).map((_, i) => {
                    const id = String(i + 1);
                    return {
                        label: `Tab ${id}`,
                        key: id,
                        children: `Content of Tab ${id}`,
                    };
                })}
            /> */}
            <Tabs
                tabPlacement={tabPlacement}
                items={tabs.map((item, idx) => ({
                    label: item.label,
                    key: item.id,
                    children: item.child,
                }))}
            />
        </>
    );
};

export default Profile;