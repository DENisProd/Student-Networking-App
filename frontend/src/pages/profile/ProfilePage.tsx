import ProfileHeader from "@/components/blocks/ProfileHeader/ProfileHeader";
import HeaderContainer from "@/components/shared/HeaderContainer/HeaderContainer";
import BackButton from "@/components/ui/BackButton/BackButton";
import Button from "@/components/ui/Button/Button";
import Layout from "@/components/ui/Layout/Layout";
import Typography from "@/components/ui/Typography/Typography";
import { routes } from "@/routes/routes";
import { useUserStore } from "@/services/store/user.store";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ProfilePage = () => {
    const { user } = useUserStore();

    return (
        <Layout paddingBottom>
            <HeaderContainer left={<BackButton />}>
                <Typography text={"Мой профиль"} variant="h2" />
            </HeaderContainer>
            {user?.id ? (
                <>
                    <ProfileHeader />
                </>
            ) : (
                <Layout>
                    <Typography text={"Вы не авторизованы"} variant="h1" />
                    <Typography
                        text={
                            "Авторизуйтесь, чтобы пользоваться новыми возможностями приложения, синхронизации расписания между устройствами"
                        }
                        variant="p"
                    />
                </Layout>
            )}
        </Layout>
    );
};

export default ProfilePage;
