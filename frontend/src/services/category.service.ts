import server from "@/middleware/wrappers/server";
import { Category, CategoryType } from "./models/Category";
import { PageableResponse } from "./models/PagebleResponse";

async function fetchCategories(type: CategoryType, size: number, page: number): Promise<Category[]> {
    try {
        console.log(`Fetching categories: type=${type}, size=${size}, page=${page}`);
        console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);
        console.log('All env vars:', import.meta.env);
        
        const url = `categories/?type=${type}&size=${size}&page=${page}`;
        console.log('Full URL:', import.meta.env.VITE_BACKEND_URL + url);
        
        const response = await server.get<PageableResponse<Category[]>>(url);
        
        console.log('Category response:', response.data);
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        // Проверяем, есть ли данные в ответе
        if (response.data && response.data.content && response.data.content.length > 0) {
            console.log(`Found ${response.data.content.length} categories`);
            return response.data.content;
        }
        
        console.log('No categories found');
        // Если данных нет, возвращаем пустой массив
        return [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
            console.error('Response headers:', error.response.headers);
        }
        throw error;
    }
}

async function create (category: Partial<Category>) {
    const response = await server.post<Category>("categories/", category);
    return response.data as Category;
}

export default { 
    fetchCategories,
    create,
}