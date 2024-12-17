import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import { routes } from "./routes/routes";
import DiscoverPage from "./pages/discover/DiscoverPage";
import ChatPage from "./pages/chat/ChatPage";
import MainLayout from "./layouts/MainLayout";
import BottomNavigation from "./components/shared/Navigation/BottomNavigation/BottomNavigation";
import ProfilePage from "./pages/profile/ProfilePage";
import ProfileEditPage from "./pages/profile/edit/ProfileEditPage";
import CategoryManagementPage from "./pages/admin/categories/CategoryManagementPage";
import SetUserForm from "./components/forms/SetUserForm/SetUserForm";
import MatchPage from "./pages/match/MatchPage";

function App() {

    return (
        <MainLayout>
            <SetUserForm />
            <Routes>
                <Route path={routes.Index} element={<WelcomePage />} />
                <Route path={routes.Discover} element={<DiscoverPage />} />
                <Route path={routes.Chat} element={<ChatPage />} />
                <Route path={routes.Match} element={<MatchPage />} />
                <Route path={routes.Profile} element={<ProfilePage />} />
                <Route path={routes.ProfileEdit} element={<ProfileEditPage />} />
                <Route path={routes.CategoryManagement} element={<CategoryManagementPage />} />
            </Routes>
            <BottomNavigation />
        </MainLayout>
    );
}

export default App;
