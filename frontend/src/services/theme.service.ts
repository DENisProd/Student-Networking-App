import { EThemeList } from "./types/theme.types";
import localStorageService from "./local-storage.service";
import { DefaultTheme } from "styled-components";
import { themes } from "./styles/theme";

const getPreferredTheme = () => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return EThemeList.BLACK;
    }
    return EThemeList.LIGHT;
};

function getTheme(): EThemeList {
    if (typeof window !== "undefined") {
        const themeFromStorage = localStorageService.getTheme() as EThemeList;

        if (themeFromStorage === EThemeList.AUTO) {
            return getPreferredTheme();
        }
        return themeFromStorage as EThemeList;
    }
    return EThemeList.LIGHT;
}

function setTheme(theme: EThemeList) {
    localStorageService.setTheme(theme);
    updateManifest(themes[theme]);
}

interface ManifestData {
    theme_color?: string;
    [key: string]: any;
}

function updateManifest(theme: DefaultTheme): void {
    // const manifest = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
    console.log("update manifest");
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
        metaThemeColor.setAttribute("content", theme.colors.background);
    }
}

function loadAllBackgroundImages (): string[] {
    if (typeof window === "undefined") return [];
    const allBackgroundImages = localStorage.getItem("images");
    if (!allBackgroundImages) return [];
    return JSON.parse(allBackgroundImages) || [];
}

function loadBackgroundImage(): string | null {
    if (typeof window !== "undefined") {
        const savedImage = localStorage.getItem("backgroundImage");
        return savedImage;
    }
    return null;
}

function addBackgroundImage (image: string): void {
    if (typeof window === "undefined") return;
    const allImages = loadAllBackgroundImages();
    allImages.push(image);
    localStorage.setItem("images", JSON.stringify(allImages));
}

function removeBackgroundImage (image: string): void {
    if (typeof window === "undefined") return;
    const allImages = loadAllBackgroundImages();
    const index = allImages.indexOf(image);
    if (index > -1) {
        allImages.splice(index, 1);
    }
    localStorage.setItem("images", JSON.stringify(allImages));
}

function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function setCssVariable(variable: string, value: string): void {
    if (typeof document !== "undefined") {
        document.documentElement.style.setProperty(variable, value);
    }
}

function initColors(theme: DefaultTheme) {
    setCssVariable("--background-tile-rgba", hexToRgba(theme.colors.backgroundTile, 0.6));
    setCssVariable("--danger-rgba", hexToRgba(theme.colors.danger, 0.4));
}

export default {
    getTheme,
    setTheme,
    updateManifest,
    loadBackgroundImage,
    initColors,
    loadAllBackgroundImages,
    addBackgroundImage,
    removeBackgroundImage,
    hexToRgba,
};
