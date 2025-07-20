import { useNewsStore } from "@/services/store/news.store";
import { NewsCard } from "@/components/widgets/NewsCard/NewsCard";

export default function NewsPage() {
  const { news } = useNewsStore();
  return (
    <div style={{ padding: 24 }}>
      <h2>Новости стартапов</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {news.map(newsItem => (
          <NewsCard key={newsItem.id} {...newsItem} />
        ))}
      </div>
    </div>
  );
} 