import React from "react";
import styles from "./TextField.module.scss";
import cn from "classnames";

interface Props {
    props?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    className?: string;
    error?: { message: string } | null;
    title?: string;
    negative?: boolean;
}

const TextArea: React.FC<Props> = ({ props, className, error, title, negative }) => {
    return (
        <div className={cn(styles.TextInput, negative && styles.negative, styles.area)}>
            {title && <div className={styles.title}>{title}</div>}
            <textarea
                autoCorrect={"on"}
                {...props}
                className={cn(styles.form_input, error && styles.error, className)}
            />
            {error && <div className={styles.error}>{error.message}</div>}
        </div>
    );
};

export default TextArea;
