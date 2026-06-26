// src/components/sidebar/menuItems.ts
import React from 'react';
import type { MenuItem } from "../../types";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

export interface MenuItemWithGuard extends MenuItem {
    requiredRoles?: string[];
    requiredPermissions?: string[];
}

export const defaultMenuItems: MenuItemWithGuard[] = [
    {
        key: '1',
        icon: React.createElement(UserOutlined),
        text: 'Dashboard',
        link: '/',
        requiredRoles: ['admin', 'manager', 'staff'],
    },
    {
        key: '2',
        icon: React.createElement(VideoCameraOutlined),
        text: 'Student',
        link: '/student',
        requiredRoles: ['admin', 'manager', 'staff', 'student'],
        // requiredPermissions: ['view-articles'],
    },
    {
        key: '3',
        icon: React.createElement(VideoCameraOutlined),
        text: 'Profile',
        link: '/profile',
        requiredRoles: ['admin', 'manager', 'staff', 'student'],
    },
    {
        key: '4',
        icon: React.createElement(VideoCameraOutlined),
        text: 'Videos',
        link: '/videos',
        requiredRoles: ['admin', 'manager'],
    },
    {
        key: '5',
        icon: React.createElement(UploadOutlined),
        text: 'Create Student',
        link: '/student/create',
        requiredPermissions: ['create-articles'],
    },
    {
        key: '6',
        icon: React.createElement(UploadOutlined),
        text: 'Admin Panel',
        link: '/admin',
        requiredRoles: ['admin'],
    },
];