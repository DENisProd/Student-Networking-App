import React from "react";
import styles from "./ImageContainer.module.scss";

interface Props {
    children: React.ReactNode;
}

const ImageContainer: React.FC<Props> = ({ children }) => {
    return <div className={styles.container}>{children}</div>;
};

export default ImageContainer;
