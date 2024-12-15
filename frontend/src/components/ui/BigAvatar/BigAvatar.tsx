import React from "react";
import cn from "classnames";
import styles from "./BigAvatar.module.scss";

interface Props {
    className?: string;
    src: string;
}

const BigAvatar: React.FC<Props> = ({ className, src }) => {
    return <img className={cn(styles.avatar, className)} src={src} alt="Изображение профиля" width={200} height={200} />;
};

export default BigAvatar;
