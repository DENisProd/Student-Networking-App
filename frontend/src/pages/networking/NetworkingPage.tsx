import { useEffect } from "react";
import { MatchList } from "@/components/blocks/MatchList/MatchList";
import Typography from "@/components/ui/Typography/Typography";
import { useMatchStore } from "@/services/store/match.store";

export default function NetworkingPage() {
  const { fetchMatches } = useMatchStore();

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h1" text="Нетворкинг" />
      <MatchList title="Симпатии и новые знакомства" />
    </div>
  );
} 