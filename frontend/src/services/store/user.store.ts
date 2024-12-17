import { create } from "zustand";
import { User } from "../models/User";
import { UserProfile } from "../models/UserProfile";
import userService from "../user.service";
import { Category } from "../models/Category";

const users: User[] = [
    {
        id: 1,
        clientId: "efefefefefedregergerggddg",
        name: "Иван",
        saveStatus: 1,
        avatar: "https://i.pinimg.com/originals/a7/0e/16/a70e1675c7bc001f1578aa76bb0a7819.png",
        role: "default",
    },
    {
        id: 2,
        clientId: "efefefefefedggddg",
        name: "Денис",
        saveStatus: 1,
        avatar: "https://sun1-19.userapi.com/s/v1/ig2/7C9nX4rUQXfkmlhhpyvHv2KbUiosZkcgMn1JNXNMSCKBFRDorvwOLkEy5u8tpmmNM8lO2ERj_3a_CWyGR1gGKfAs.jpg?quality=95&crop=436,241,1071,1071&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=200x200",
        role: "default",
    },
    {
        id: 3,
        clientId: "efefefefefedggddg",
        name: "Алексей",
        saveStatus: 1,
        avatar: "https://avatars.mds.yandex.net/i?id=4c31a4988f1c60b717fe30abe397c9f4_l-12472657-images-thumbs&n=13",
        role: "default",
    },
    {
        id: 4,
        clientId: "efefefefefedggddg",
        name: "Петр",
        saveStatus: 1,
        avatar: "https://wallpapers.com/images/hd/split-face-portrait-illustration-94fzh2bivtwz8744.jpg",
        role: "default",
    },
    {
        id: 5,
        clientId: "efefefefefedggddg",
        name: "Светлана",
        saveStatus: 1,
        avatar: "https://cdn.vectorstock.com/i/1000v/41/11/flat-business-woman-user-profile-avatar-icon-vector-4334111.jpg",
        role: "default",
    }
]

interface UserStore {
    user: User;
    userProfile: UserProfile;

    fetchUser: (clientId: number) => void;
    updateUser: (newProfile: Partial<UserProfile>) => void;
    fetchUserProfile: () => void;
    addInterest: (interest: Category) => void;
    removeInterest: (interestId: number) => void;
    setTarget: (target: Category) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
    user: {
        id: 2,
        clientId: "efefefefefedggddg",
        name: "Денис",
        saveStatus: 1,
        avatar: "https://sun1-19.userapi.com/s/v1/ig2/7C9nX4rUQXfkmlhhpyvHv2KbUiosZkcgMn1JNXNMSCKBFRDorvwOLkEy5u8tpmmNM8lO2ERj_3a_CWyGR1gGKfAs.jpg?quality=95&crop=436,241,1071,1071&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=200x200",
        role: "default",
    } as User,
    userProfile: {} as UserProfile,

    fetchUser: (clientId: number) => {
        userService.loginUser((users[clientId] || users[0]).id)
        userService.fetchUserProfile((users[clientId] || users[0]).id).then(res => {
            set({ userProfile: res });
        })
        set({
            user: users[clientId] || users[0]
        })
    },
    updateUser: (newProfile: Partial<UserProfile>) => {
        const { userProfile } = get();
        const profile = { ...userProfile, ...newProfile};

        const updateObject = userService.getUserProfileUpdate(profile);
        userService.updateUserProfile(updateObject).then(res => {
            set({ userProfile: res });
        })
    },
    fetchUserProfile: () => {
        const { user } = get();
        userService.fetchUserProfile(user.id).then(res => {
            set({ userProfile: res });
        })
    },
    addInterest: (interest: Category) => {
        set((state) => ({
            userProfile: {
                ...state.userProfile,
                interests: [...(state.userProfile.interests || []), interest]
            }
        }));
    },
    removeInterest: (interestId: number) => {
        set((state) => ({
            userProfile: {
                ...state.userProfile,
                interests: state.userProfile.interests.filter(i => i.id!== interestId)
            }
        }));
    },
    setTarget: (target: Category) => {
        set((state) => ({
            userProfile: {
               ...state.userProfile,
                target
            }
        }));
    }
}));