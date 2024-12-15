import React from "react";
import Loader from "../Loader/Loader";
import { usePreloaderStore } from "@/services/store/preloader.store";
import styles from "./Preloader.module.scss";

const Preloader: React.FC = () => {
    const isLoading = usePreloaderStore((state) => state.isLoading);

    if (!isLoading) return null;

    return (
        <div className={styles.preloader}>
            <Loader isLoading={isLoading} />
        </div>
    );
};

export default Preloader;
