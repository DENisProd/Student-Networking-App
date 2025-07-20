import { create } from "zustand";
import { Startup } from "@/models/Startup";

interface StartupStore {
  startups: Startup[];
  fetchStartups: () => void;
}

export const useStartupStore = create<StartupStore>((set) => ({
  startups: [
    { id: 1, title: "Unicorn AI", logo: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png", description: "AI для поиска единорогов", rating: 4.9 },
    { id: 2, title: "EcoFood", logo: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png", description: "Экологичные продукты", rating: 4.7 },
    { id: 3, title: "SpaceStart", description: "Стартап для космических туристов", rating: 4.5 },
  ],
  fetchStartups: () => {},
})); 