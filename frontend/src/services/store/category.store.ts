import { create } from "zustand";
import { Category, CategoryType } from "../models/Category";
import categoryService from "../category.service";

interface CategoryStore {
    allCategories: Category[];

    selectedCategory: CategoryType;
    setSelectedCategory(category: CategoryType): void;

    create: (category: Partial<Category>) => Promise<Category>;

    fetchCategories: (type: CategoryType) => void;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
    allCategories: [],

    selectedCategory: CategoryType.INTERESTS,
    setSelectedCategory: (category: CategoryType) => set({ selectedCategory: category }),

    create: async (category: Partial<Category> ): Promise<Category> => {
        const _category = await categoryService.create(category);
        return _category;
    },

    fetchCategories: async (type: CategoryType) => {
        try {
            const { allCategories } = get();
            if (allCategories.filter(category => category.type === type).length > 0) return;
            const res = await categoryService.fetchCategories(type, 50, 0);
            
            set((state) => {
                const existingCategories = state.allCategories;
                const newCategories = res.filter((category) => 
                    !existingCategories.some((existing) => existing.id === category.id)
                );
                return {
                    allCategories: [...existingCategories, ...newCategories],
                };
            });

        } catch (error) {
            console.error("Ошибка получения категорий");
        }
    }
}))