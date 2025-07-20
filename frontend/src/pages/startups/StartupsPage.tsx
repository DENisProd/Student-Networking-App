import { useStartupStore } from "@/services/store/startup.store";
import { StartupCard } from "@/components/widgets/StartupCard/StartupCard";

export default function StartupsPage() {
  const { startups } = useStartupStore();
  return (
    <div style={{ padding: 24 }}>
      <h2>Топ стартапов</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {startups.map(startup => (
          <StartupCard key={startup.id} {...startup} />
        ))}
      </div>
    </div>
  );
} 