import React from "react";
import { CalendarCheck, ClipboardList, Compass, House, LayoutDashboard, MessageCircle, Star } from 'lucide-react';

export interface INavigationTab {
    link: string;
    label: string;
    icon: React.ReactNode;
}

const SIZE = 28;

export const navigationTabs: INavigationTab[] = [
    {
        link: "/",
        label: "Главная",
        icon: <House size={SIZE} color="var(--border-color2)"/>,
    },
    {
        link: "/match",
        label: "Избранное",
        icon: <Star size={SIZE} color="var(--border-color2)" />,
    },
    {
        link: "/discover",
        label: "Обзор",
        icon: <Compass size={SIZE} color="var(--border-color2)"/>,
    },
    {
        link: "/chat",
        label: "Чат",
        icon: <MessageCircle size={SIZE} color="var(--border-color2)"/>,
    }
]