import { create } from "zustand";
import { News } from "@/models/News";

interface NewsStore {
  news: News[];
  fetchNews: () => void;
}

export const useNewsStore = create<NewsStore>((set) => ({
  news: [
    { id: 1, title: "Unicorn AI привлек $1M", content: "Стартап Unicorn AI закрыл раунд инвестиций...", date: "2024-07-01", startupTitle: "Unicorn AI" },
    { id: 2, title: "EcoFood вышел на рынок Европы", content: "Теперь продукты EcoFood доступны в ЕС...", date: "2024-06-25", startupTitle: "EcoFood" },
    { id: 3, title: "SpaceStart запустил новый сервис", content: "Космический туризм стал ближе...", date: "2024-06-20", startupTitle: "SpaceStart" },
  ],
  fetchNews: () => {},
})); 