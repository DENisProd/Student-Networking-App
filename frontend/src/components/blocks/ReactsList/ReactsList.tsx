import Typography from "@/components/ui/Typography/Typography";
import { useReactStore } from "@/services/store/reacts.store";
import { useUserStore } from "@/services/store/user.store";
import React, { useEffect } from "react";
import styles from "./ReactsList.module.scss";
import ReactCard from "./ReactCard/ReactCard";

const ReactsList = () => {
    const { fetchReacts, outgoingReacts } = useReactStore();
    const { userProfile } = useUserStore();

    useEffect(() => {
        if (outgoingReacts.length == 0) fetchReacts();
    }, []);

    return (
        <>
            <Typography variant="h2" text="Симпатии" />
            <Typography variant="p" text="Вы кому-то интресны!" />
            <div className={styles.list}>
                {outgoingReacts.map((match) => (
                    <ReactCard reacts={match} />
                ))}
            </div>
        </>
    );
};

export default ReactsList;
