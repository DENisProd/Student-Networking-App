import Layout from "@/components/ui/Layout/Layout";
import { UserProfile } from "@/services/models/UserProfile";
import React, { useEffect, useRef, useState } from "react";
import ImageTile from "../ImageUploader/ImageTile/ImageTile";
import { MediaSize } from "@/services/models/Media";
import MediaCount from "./MediaCount/MediaCount";
import styles from "./ProfileCard.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Card from "@/components/ui/Card/Card";
import Typography from "@/components/ui/Typography/Typography";

interface Props {
    profile: UserProfile;
}
const ProfileCard: React.FC<Props> = ({ profile }) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const swiperRef = useRef<SwiperCore | null>(null);

    const handleSlideChange = (swiper: SwiperCore) => {
        const newIndex = swiper.activeIndex;
        setActiveIndex(newIndex);
    };

    useEffect(() => {
        setActiveIndex(0);
    }, [profile])

    return (
        <Layout className={styles.profile_page} paddingBottom>
            <MediaCount count={profile?.mediaList.filter((media) => media.size === MediaSize.LARGE).length} selected={activeIndex} />
            <Swiper
                className={styles.SwipeableCarousel}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                initialSlide={activeIndex}
                onSlideChange={handleSlideChange}
                spaceBetween={52}
                slidesPerView={1}
                pagination={{ clickable: true }}
                mousewheel={{ forceToAxis: true }}
            >
                {profile.mediaList
                    .filter((media) => media.size === MediaSize.LARGE)
                    .map((media, index) => (
                        <SwiperSlide key={index}>
                            <ImageTile src={media} alt="Медиа контент пользователя" />
                        </SwiperSlide>
                    ))}
            </Swiper>
            <Card>
                <Layout noPadding>
                    <Typography variant="h1" text={profile?.name + ", " + profile?.age} />
                    <Typography variant="p" text={profile.about} />
                    <Typography variant="p" text={profile.description} />
                </Layout>
            </Card>
        </Layout>
    );
};

export default ProfileCard;
