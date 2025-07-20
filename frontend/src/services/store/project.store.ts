import { create } from "zustand";
import { Project } from "@/models/Project";

interface ProjectStore {
  projects: Project[];
  fetchProjects: () => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [
    {
      id: 1,
      title: "Стартап по поиску единорогов",
      description: "Проект для поиска и выращивания единорогов в домашних условиях.",
      members: [
        { id: 1, name: "Иван" },
        { id: 2, name: "Денис" },
      ],
    },
    {
      id: 2,
      title: "IT-команда мечты",
      description: "Команда для хакатонов и стартапов.",
      members: [
        { id: 3, name: "Алексей" },
        { id: 4, name: "Петр" },
      ],
    },
  ],
  fetchProjects: () => {},
})); 