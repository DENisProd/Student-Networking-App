import React from 'react';
import styles from './TextField.module.scss';
import cn from 'classnames';

interface Props {
    props?: React.InputHTMLAttributes<HTMLInputElement>,
    className?: string,
    error?: { message: string } | null,
    title?: string,
    icon?: React.ReactNode,
    negative?: boolean
}

const TextField: React.FC<Props> = ({ error, title, props, className, icon, negative }) => {

    const isIconExists = !!icon;

    return (
        <div className={cn(styles.TextInput, isIconExists && styles.with_icon, negative && styles.negative, className)}>
            {title && <div className={styles.title}>{title}</div>}
            {icon && <div className={styles.icon}>{icon}</div>}
            <input
                className={cn(styles.input, error && styles.error)}
                {...props}
            />
            {error && <div className={styles.error}>{error.message}</div>}
        </div>
    )
};

export default TextField;
