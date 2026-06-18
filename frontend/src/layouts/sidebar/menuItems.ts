import React from 'react';
import type { MenuItem } from "../../types";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

export const defaultMenuItems: MenuItem[] = [
    {
        key: '1',
        icon: React.createElement(UserOutlined),
        text: 'Dashboard',
        link: '/',
    },
    {
        key: '2',
        icon: React.createElement(VideoCameraOutlined),
        text: 'Student',
        link: '/student',
    },
    {
        key: '3',
        icon: React.createElement(VideoCameraOutlined),
        text: 'Profile',
        link: '/profile',
    },
    {
        key: '4',
        icon: React.createElement(VideoCameraOutlined),
        text: 'Videos',
        link: '/videos',
    },
    {
        key: '5',
        icon: React.createElement(UploadOutlined),
        text: 'Upload',
        link: '/upload',
    },
];
