import { useEffect, useState } from "react";
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
import NetworkingPage from "./pages/networking/NetworkingPage";
import VacanciesPage from "./pages/vacancies/VacanciesPage";
import StartupsPage from "./pages/startups/StartupsPage";
import NewsPage from "./pages/news/NewsPage";
import { useUserStore } from "./services/store/user.store";

function App() {
    const { fetchUser, user } = useUserStore();
    useEffect(() => {
        fetchUser();
    }, [])

    useEffect(() => {
        console.log(user)
    }, [user])

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
                <Route path={routes.Networking} element={<NetworkingPage />} />
                <Route path={routes.Vacancies} element={<VacanciesPage />} />
                <Route path={routes.Startups} element={<StartupsPage />} />
                <Route path={routes.News} element={<NewsPage />} />
            </Routes>
            <BottomNavigation />
        </MainLayout>
    );
}

export default App;
