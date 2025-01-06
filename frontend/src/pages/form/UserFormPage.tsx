import ProfileCard from "@/components/blocks/ProfileCard/ProfileCard";
import HeaderContainer from "@/components/shared/HeaderContainer/HeaderContainer";
import BackButton from "@/components/ui/BackButton/BackButton";
import Button from "@/components/ui/Button/Button";
import Layout from "@/components/ui/Layout/Layout";
import Typography from "@/components/ui/Typography/Typography";
import { useDiscoveryStore } from "@/services/store/discovery.store";
import { MessageCircleMore } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./UserFormPage.module.scss";
import { routes } from "@/routes/routes";

const UserFormPage = () => {
    const { profileId } = useParams();
    const { fetchProfileById, userProfile } = useDiscoveryStore();

    useEffect(() => {
        console.log(profileId);
        if (+profileId && userProfile?.id !== +profileId) fetchProfileById(+profileId);
    }, [profileId]);

    const startChat = () => {};

    return (
        <Layout paddingBottom noPadding>
            <HeaderContainer left={<BackButton />}>
                <Typography text={"Просмотр анкеты"} variant="h2" />
            </HeaderContainer>
            <Layout noPadding>
                {userProfile?.name ? <ProfileCard profile={userProfile} /> : <div>загрузка...</div>}
                <Layout horizontal center className={styles.container}>
                    <Link to={routes.Chat + "/" + profileId}>
                        <Button type="primary" circle onClick={startChat}>
                            <MessageCircleMore size={32} color="var(--text-color)" />
                            Начать общение
                        </Button>
                    </Link>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default UserFormPage;
