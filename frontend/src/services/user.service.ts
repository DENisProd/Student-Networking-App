import server from "@/middleware/wrappers/server";
import { UserProfile, UserProfileUpdate } from "./models/UserProfile";
import { PageableResponse } from "./models/PagebleResponse";

async function fetchUserProfile(userId: number): Promise<UserProfile> {
    const response = await server.get<UserProfile>("profiles/" + userId);
    return response.data;
}

async function fetchRandomUserProfiles(page: number, size: number): Promise<UserProfile[]> {
    const response = await server.get<PageableResponse<UserProfile[]>>(`profiles/random?size=${size}&page=${page}`);
    return response.data.content;
}

async function updateUserProfile(userProfile: UserProfileUpdate) {
    console.log(userProfile);
    const response = await server.put<UserProfile>("profiles/", userProfile);
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
    fetchUserProfile,
    fetchRandomUserProfiles,
    updateUserProfile,
    getUserProfileUpdate,
    addMedia,
};