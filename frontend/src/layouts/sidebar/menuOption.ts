// src/components/sidebar/menuOption.ts
import React from 'react';
import { Link } from 'react-router-dom';
import { defaultMenuItems } from './menuItems';
import type { MenuItemWithGuard } from './menuItems';

export const getMenuOptions = (
    userPermissions: string[] = [],
    userRoles: string[] = []
) => {
    const filteredItems = defaultMenuItems.filter((item: MenuItemWithGuard) => {
        if (!item.requiredRoles && !item.requiredPermissions) {
            return true;
        }
        if (item.requiredRoles) {
            const hasRole = item.requiredRoles.some((role) =>
                userRoles.includes(role)
            );
            if (hasRole) return true;
        }
        if (item.requiredPermissions) {
            const hasPermission = item.requiredPermissions.some((perm) =>
                userPermissions.includes(perm)
            );
            if (hasPermission) return true;
        }

        return false;
    });

    return {
        menuOptions: filteredItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: React.createElement(
                Link,
                { to: item.link, style: { color: 'white', textDecoration: 'none' } },
                item.text
            ),
        })),
        menuPaths: filteredItems.map((item) => ({
            key: item.key,
            path: item.link,
        })),
    };
};