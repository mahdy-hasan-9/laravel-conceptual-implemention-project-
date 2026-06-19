import React, { Children, useEffect, useState } from 'react';
import type { RadioChangeEvent, TabsProps } from 'antd';
import { Input, Radio, Space, Spin, Tabs } from 'antd';
import Title from 'antd/es/typography/Title';
import Item from 'antd/es/list/Item';
import ProfileInfo from './ProfileInfo';
import { tabs } from './tabs';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../services/authService';
import toast from 'react-hot-toast';


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