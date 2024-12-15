import server from "@/middleware/wrappers/server";
import { Category, CategoryType } from "./models/Category";
import { PageableResponse } from "./models/PagebleResponse";

async function fetchCategories(type: CategoryType, size: number, page: number): Promise<Category[]> {
    const response = await server.get<PageableResponse<Category[]>>(`categories/?type=${type}&size=${size}&page=${page}`);
    return response.data.content;
}

async function create (category: Partial<Category>) {
    const response = await server.post<Category>("categories/", category);
    return response.data as Category;
}

export default { 
    fetchCategories,
    create,
}