import { EThemeList } from "./types/theme.types";

function getTheme (): string {
    if (typeof window !== 'undefined') {
        const theme = window.localStorage.getItem("theme");
        return theme as EThemeList || EThemeList.AUTO;
    } else {
        return EThemeList.AUTO;
    }
}

function setTheme (newTheme: EThemeList) {
    localStorage.setItem("theme", newTheme);
}

function setClientId (clientId: string) {
    localStorage.setItem("clientId", clientId);
}

function getClientId (): string {
    return localStorage.getItem("clientId") || "";
}

function getRefererId (): string {
    return localStorage.getItem("refererId") || "";
}

function removeRefererId (): void {
    console.log("Removing referer");
    localStorage.removeItem("refererId");
}

function setRefererId (refererId: string) {
    localStorage.setItem("refererId", refererId);
}

function deleteAllData (): void {
    localStorage.clear();
}

export default {
    getTheme,
    setTheme,
    setClientId,
    getClientId,
    getRefererId,
    removeRefererId,
    setRefererId,
    deleteAllData,
}