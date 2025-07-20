import { create } from "zustand";
import { Category, CategoryType } from "../models/Category";
import categoryService from "../category.service";

interface CategoryStore {
    allCategories: Category[];
    isLoading: boolean;
    error: string | null;

    selectedCategory: CategoryType;
    setSelectedCategory(category: CategoryType): void;

    create: (category: Partial<Category>) => Promise<Category>;

    fetchCategories: (type: CategoryType) => void;
    clearError: () => void;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
    allCategories: [],
    isLoading: false,
    error: null,

    selectedCategory: CategoryType.INTERESTS,
    setSelectedCategory: (category: CategoryType) => set({ selectedCategory: category }),

    create: async (category: Partial<Category> ): Promise<Category> => {
        const _category = await categoryService.create(category);
        return _category;
    },

    fetchCategories: async (type: CategoryType) => {
        try {
            const { allCategories } = get();
            console.log(`fetchCategories called for type: ${type}`);
            console.log(`Current allCategories:`, allCategories);
            console.log(`Categories of type ${type}:`, allCategories.filter(category => category.type === type));
            
            if (allCategories.filter(category => category.type === type).length > 0) {
                console.log(`Categories of type ${type} already exist, skipping fetch`);
                return;
            }
            
            console.log(`No categories of type ${type} found, fetching...`);
            set({ isLoading: true, error: null });
            
            const res = await categoryService.fetchCategories(type, 50, 0);
            console.log(`Received categories:`, res);
            
            set((state) => {
                const existingCategories = state.allCategories;
                const newCategories = res.filter((category) => 
                    !existingCategories.some((existing) => existing.id === category.id)
                );
                console.log(`New categories to add:`, newCategories);
                return {
                    allCategories: [...existingCategories, ...newCategories],
                    isLoading: false,
                    error: null
                };
            });

        } catch (error) {
            console.error("Ошибка получения категорий:", error);
            set({ 
                isLoading: false, 
                error: error instanceof Error ? error.message : "Неизвестная ошибка при загрузке категорий" 
            });
        }
    },
    
    clearError: () => set({ error: null })
}))