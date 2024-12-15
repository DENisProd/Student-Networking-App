export interface User {
    id?: number;
    clientId: string;
    name: string;
    saveStatus?: number;
    avatar?: string;
    role?: string;
}