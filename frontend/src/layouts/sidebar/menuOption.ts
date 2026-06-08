import React from 'react';
import { Link } from 'react-router-dom';
import { defaultMenuItems } from './menuItems';

export const menuOptions = defaultMenuItems.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: React.createElement(
        Link,
        { to: item.link, style: { color: 'white', textDecoration: 'none' } },
        item.text
    ),
}));

// Export path mapping for active state detection
export const menuPaths = defaultMenuItems.map((item) => ({
    key: item.key,
    path: item.link,
}));