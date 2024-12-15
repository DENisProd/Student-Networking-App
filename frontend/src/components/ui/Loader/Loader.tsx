import React from "react";
import styles from "./Loader.module.scss";
import cn from "classnames";
import { LoaderCircle } from "lucide-react";

interface Props {
    size?: number;
    isLoading: boolean;
}

const Loader: React.FC<Props> = ({ size = 1, isLoading }) => {
    return (
        <div className={cn(styles.container, isLoading && styles.visible)} style={{
            height: `${ isLoading ? (size * 24) : 0 }px`
        }}>
                <LoaderCircle
                color={"var(--border-color)"}
                    className={styles.loader}
                    style={{
                        width: `${24 * size}px`,
                        height: `${24 * size}px`,
                    }}
                />
        </div>
    );
};

export default Loader;
