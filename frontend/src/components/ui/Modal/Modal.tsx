import React from "react";
import styles from "./Modal.module.scss";
import cn from "classnames";
import Typography from "../Typography/Typography";
import ReactDOM from "react-dom";

interface Props {
    isVisible?: boolean;
    setIsVisible(isVisible: boolean): void;
    children: React.ReactNode;
    title?: string;
}

const Modal: React.FC<Props> = ({ isVisible, setIsVisible, children, title }) => {
    const onClose = () => {
        setIsVisible(false);
    };

    return ReactDOM.createPortal(
        <div className={cn(styles.main_container, isVisible && styles.visible)}>
            <div className={styles.overlay} onClick={onClose} />
            <div className={cn(styles.content)}>
                <header>
                    <Typography variant="h1" text={title} className={styles.title} />
                </header>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
