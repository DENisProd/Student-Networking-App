import ProfileAbout from "@/components/blocks/Profile/ProfileAbout";
import ProfileInterests from "@/components/blocks/Profile/ProfileInterests";
import ProfilePhotos from "@/components/blocks/Profile/ProfilePhotos";
import ProfileTarget from "@/components/blocks/Profile/ProfileTarget";
import HeaderContainer from "@/components/shared/HeaderContainer/HeaderContainer";
import BackButton from "@/components/ui/BackButton/BackButton";
import Card from "@/components/ui/Card/Card";
import Layout from "@/components/ui/Layout/Layout";
import Typography from "@/components/ui/Typography/Typography";
import { useUserStore } from "@/services/store/user.store";
import { BookImage, Clapperboard, Contact, Crosshair } from "lucide-react";
import { useEffect } from "react";

const ProfileEditPage = () => {
    const { userProfile, fetchUserProfile, user } = useUserStore();

    useEffect(() => {
        if (Object.keys(userProfile).length === 0 || userProfile?.userId !== user?.id) {
            fetchUserProfile();
        }
    }, [user]);

    return (
        <Layout paddingBottom noPadding>
            <HeaderContainer left={<BackButton />}>
                <Typography text={"Редактирование анкеты"} variant="h2" />
            </HeaderContainer>
            <Layout noPadding>
                <Card>
                    <Typography text={"В этом разделе вы можете изменить информацию о себе."} variant="p" />
                </Card>

                <ProfilePhotos />
                <ProfileAbout />
                <ProfileInterests />
                <ProfileTarget />
                
            </Layout>
        </Layout>
    );
};

export default ProfileEditPage;
