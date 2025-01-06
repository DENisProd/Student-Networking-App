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
import MatchPage from "./pages/match/MatchPage";
import MockLoginPage from "./pages/login/MockLoginPage";
import UserFormPage from "./pages/form/UserFormPage";

function App() {

    return (
        <MainLayout>
            <Routes>
                <Route path={routes.Index} index element={<WelcomePage />} />
                <Route path={routes.Discover} element={<DiscoverPage />} />
                <Route path={routes.Chat} element={<ChatPage />} />
                <Route path={routes.Match} element={<MatchPage />} />
                <Route path={routes.Profile} element={<ProfilePage />} />
                <Route path={routes.Form + "/:profileId"} element={<UserFormPage />} />
                <Route path={routes.ProfileEdit} element={<ProfileEditPage />} />
                <Route path={routes.CategoryManagement} element={<CategoryManagementPage />} />
                <Route path={routes.Login} element={<MockLoginPage />} />
            </Routes>
            <BottomNavigation />
        </MainLayout>
    );
}

export default App;
