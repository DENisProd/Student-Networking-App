"use client";

import React, { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import cn from "classnames";
import { useThemeStore } from "@/services/store/theme.store";

interface Props {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    icon?: React.ReactNode;
    negative?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    small?: boolean;
    medium?: boolean;
    square?: boolean;
    userSelectBlock?: boolean;
}

const Card: React.FC<Props> = ({
    children,
    title,
    subtitle,
    icon,
    negative = false,
    className,
    style,
    onClick,
    small,
    medium,
    square,
    userSelectBlock,
}: Props) => {
    const { transparent } = useThemeStore();
    const [isTransparent, setIsTransparent] = useState<boolean>(false);

    useEffect(() => {
        if (transparent) setIsTransparent(transparent);
    }, [transparent]);

    return (
        <div
            className={cn(styles.Card, negative && styles.negative, small && styles.small, medium && styles.medium, square && styles.square, isTransparent && styles.transparent, userSelectBlock && styles.user_select_block)}
            style={style}
            onClick={onClick}
        >
            {title && (
                <div className={styles.header}>
                    <div className={styles.header_flex}>
                        {icon}
                        {title}
                    </div>
                    <div className={styles.subtitle}>
                        {subtitle}
                    </div>
                </div>
            )}
            <div className={cn(styles.body, className)}>{children}</div>
            {/* {children} */}
        </div>
    );
};

export default Card;
