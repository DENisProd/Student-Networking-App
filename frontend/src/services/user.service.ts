import server, { mainServer } from "@/middleware/wrappers/server";
import { UserProfile, UserProfileUpdate } from "./models/UserProfile";
import { PageableResponse } from "./models/PagebleResponse";
import { User } from "./models/User";
import IResponse from "./models/Response";

async function fetchUser(): Promise<User> {
    const response = await mainServer.get<IResponse<User>>("user/profile");
    return response.data.data;
}

async function fetchUserProfile(userId: number | null, name: string | null): Promise<UserProfile> {
    let params: string = "";
    if (userId) {
        params += `userId=${userId}`;
    }
    if (name) {
        if (params.length > 0) params += "&";
        params += `name=${name}`;
    }
    if (params.length > 2) params = "?" + params;
    const response = await server.get<UserProfile>("profiles/"+params);
    return response.data;
}

async function fetchRandomUserProfiles(page: number, size: number, profileId: number): Promise<UserProfile[]> {
    const response = await server.get<PageableResponse<UserProfile[]>>(`profiles/random?size=${size}&page=${page}&profile=${profileId}`);
    
    // Проверяем, есть ли данные в ответе
    if (response.data && response.data.content && response.data.content.length > 0) {
        return response.data.content;
    }
    
    // Если данных нет, возвращаем пустой массив
    return [];
}

async function updateUserProfile(userProfile: UserProfileUpdate) {
    const response = await server.put<UserProfile>("profiles/", userProfile);
    return response.data;
}

async function loginUser(userId: number) {
    const response = await server.post(`auth/login?userId=${userId}`);
    return response.data;
}

function getUserProfileUpdate(userProfile: UserProfile) {
    return {
        id: userProfile?.id,
        name: userProfile.name,
        about: userProfile.about,
        description: userProfile.description,
        age: +userProfile.age,
        sex: userProfile.sex,
        targetId: userProfile.target?.id || 0,
        interests: userProfile.interests.map((interest) => interest?.id),
    } as UserProfileUpdate;
}

async function addMedia(file: File, profileId: number) {
    const req = new FormData();
    req.append("file", file);
    req.append("profileId", profileId.toString());

    const response = await server.post("profiles/media", req);
    return response.data;
}

export default {
    fetchUser,
    fetchUserProfile,
    fetchRandomUserProfiles,
    updateUserProfile,
    getUserProfileUpdate,
    addMedia,
    loginUser,
};
