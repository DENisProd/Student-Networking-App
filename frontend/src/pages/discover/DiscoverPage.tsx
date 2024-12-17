import ProfileCard from "@/components/blocks/ProfileCard/ProfileCard";
import Button from "@/components/ui/Button/Button";
import Layout from "@/components/ui/Layout/Layout";
import { useDiscoveryStore } from "@/services/store/discovery.store";
import React, { useEffect, useState } from "react";
import styles from "./DiscoverPage.module.scss";
import { Heart, X } from "lucide-react";
import PageLayout from "@/components/ui/Page/PageLayout";
import { useReactStore } from "@/services/store/reacts.store";
import { useUserStore } from "@/services/store/user.store";

const DiscoverPage = () => {
    const { profiles, fetchRandomProfiles } = useDiscoveryStore();
    const { sendLike } = useReactStore();
    const { user, fetchUserProfile, userProfile } = useUserStore();

    const [currentProfile, setCurrentProfile] = useState<number>(0);

    useEffect(() => {
        if (!user) fetchUserProfile();
    }, [])

    useEffect(() => {
        if (Object.keys(userProfile).length > 0) {
            console.log("User profile", userProfile);
            fetchRandomProfiles(userProfile?.id)
        } else {
            fetchUserProfile();
        }
    }, [userProfile]);

    useEffect(() => {
        console.log("profiles", profiles);
    }, [profiles]);

    const sendLikeToTarget = (isLike: boolean) => {
        sendLike({
            id: 0,
            targetProfileId: profiles[currentProfile].id,
            userId: user?.id,
            isLike,
        }).then(res => {
            setCurrentProfile(currentProfile+1);
        })
    }

    if (profiles.length === 0) return (
      <div>Загрузка данных.</div>
    )

    return (
        <PageLayout noPadding>
            <ProfileCard profile={profiles[currentProfile]}/>

            <Layout horizontal spaceBetween className={styles.container}>
                <Button type="custom" color={"var(--red)"} circle onClick={() => sendLikeToTarget(false)}>
                    <X size={32} color="var(--text-color)" />
                </Button>
                <Button type="custom" color={"var(--green)"} circle onClick={() => sendLikeToTarget(true)}>
                    <Heart size={32} color="var(--text-color)" />
                </Button>
            </Layout>
        </PageLayout>
    );
};

export default DiscoverPage;
