import React from "react";
import styles from "./Avatar.module.scss";
import cn from "classnames";

interface Props {
    src: string;
    size?: number;
    className?: string;
    square?: boolean;
}

const Avatar: React.FC<Props> = ({ src, size, square, className }) => {
    return <img src={src} alt={"avatar"} className={cn(styles.avatar, square && styles.square, className)} style={{ width: size, height: size }} />;
};

export default Avatar;
