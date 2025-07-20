import { useMatchStore } from "@/services/store/match.store";
import MatchCard from "../MatchCard/MatchCard";
import styles from "./MatchList.module.scss";
import Typography from "@/components/ui/Typography/Typography";
import { Match } from "@/models/Match";

interface MatchListProps {
  matches?: Match[];
  title?: string;
}

export function MatchList({ matches, title }: MatchListProps) {
  const storeMatches = useMatchStore(state => state.matches);
  const data = matches || storeMatches;

  return (
    <>
      {title && <Typography variant="h2" text={title} />}
      <div className={styles.list}>
        {data.map((match) => (
          <MatchCard match={match} key={match.id} />
        ))}
      </div>
    </>
  );
}
