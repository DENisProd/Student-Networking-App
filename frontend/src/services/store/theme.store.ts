import { create } from "zustand";
import DefaultImage from "../../public/assets/icons/default_bg.png";
import { EThemeList } from "../types/theme.types";
import themeService from "../theme.service";
import { themes } from "../styles/theme";
import cookieService from "../cookie.service";

const defaultImageSettings = {
    transparent: true,
    backgroundBlur: 4,
    backgroundOpacity: 0.6,
};

const defaultSettings = {
    transparent: false,
    backgroundBlur: 0,
    backgroundOpacity: 1,
};

interface ThemeState {
    theme: EThemeList;
    transparent: boolean;
    backgroundBlur: number;
    backgroundOpacity: number;
    backgroundImage: string;
    defaultBackgroundImages: string[];
    allBackgroundImages: string[];

    isLoaded: boolean;

    init: () => void;
    setTheme: (theme: EThemeList) => void;
    initTheme: () => void;

    loadBackgroundImage: () => void;
    loadAllBackgroundImages: () => void;
    setBackgroundImage: (image: string) => void;
    setTransparent: (transparent: boolean) => void;
    addBackgroundImage: (image: string) => void;
    removeBackgroundImage: (image: string) => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
    theme: EThemeList.AUTO,
    transparent: false,
    backgroundBlur: 0,
    backgroundOpacity: 1,
    backgroundImage: "",
    defaultBackgroundImages: [""],
    allBackgroundImages: [],

    isLoaded: false,

    init: () => {
        console.log("load");
        const { backgroundImage } = get();
        if (!backgroundImage) {
            const savedImage = themeService.loadBackgroundImage();
            let settings: Partial<ThemeState> = {};
            if (savedImage) {
                settings = defaultImageSettings;
            } else {
                settings = defaultSettings;
            }
            set({
                backgroundImage: savedImage || "",
                ...settings,
                isLoaded: true,
            });
        }
    },

    setTheme: (theme: EThemeList) => {
        themeService.setTheme(theme);
        themeService.initColors(themes[theme]);
        cookieService.setCookie("theme", themes[theme].colors.background, 30);
        set({ theme });
    },
    initTheme: () => {
        const savedTheme = themeService.getTheme();
        themeService.updateManifest(themes[savedTheme]);
        themeService.initColors(themes[savedTheme]);
        set({ theme: savedTheme });
    },

    setBackgroundImage: (image?: string) => {
        let settings: Partial<ThemeState> = {};
        if (image) {
            localStorage.setItem("backgroundImage", image);
            settings = defaultImageSettings;
        } else {
            localStorage.removeItem("backgroundImage");
            settings = defaultSettings;
        }
        set({
            backgroundImage: image || "",
            ...settings,
        });
    },

    loadBackgroundImage: () => {
        console.log("load");
        const savedImage = themeService.loadBackgroundImage();
        let settings: Partial<ThemeState> = {};
        if (savedImage) {
            settings = defaultImageSettings;
        } else {
            settings = defaultSettings;
        }
        set({
            backgroundImage: savedImage || "",
            ...settings,
            isLoaded: true,
        });
    },
    loadAllBackgroundImages: () => {
        const allSaved = themeService.loadAllBackgroundImages();
        set({
            allBackgroundImages: allSaved || [],
        })
    },

    setTransparent: (transparent: boolean) => {
        set({ transparent });
    },
    addBackgroundImage: (image: string) => {
        themeService.addBackgroundImage(image);
        set((state) => ({
            allBackgroundImages: [...state.allBackgroundImages, image],
        }));
    },

    removeBackgroundImage: (image: string) => {
        themeService.removeBackgroundImage(image);
        set((state) => ({
            allBackgroundImages: state.allBackgroundImages.filter((img) => img !== image),
        }));
    },
}));
