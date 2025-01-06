import { useMatchStore } from "@/services/store/match.store";
import MatchCard from "../MatchCard/MatchCard";
import styles from "./MatchList.module.scss";
import { useUserStore } from "@/services/store/user.store";
import { useEffect } from "react";
import Typography from "@/components/ui/Typography/Typography";

const MatchList = () => {
    const { matches, fetchMatches } = useMatchStore();
    const { userProfile } = useUserStore();

    useEffect(() => {
        fetchMatches();
    }, [userProfile]);

    return (
        <>
            <Typography variant="h2" text="Симпатии" />
            <Typography variant="p" text="Начинайте общение!" />

            <div className={styles.list}>
                {matches.map((match) => (
                    <MatchCard match={match} />
                ))}
            </div>
            <br />
        </>
    );
};

export default MatchList;
