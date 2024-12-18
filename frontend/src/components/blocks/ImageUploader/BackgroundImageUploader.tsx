import Button from "@/components/ui/Button/Button";
import Layout from "@/components/ui/Layout/Layout";
import Typography from "@/components/ui/Typography/Typography";
import { Eraser, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./BackgroundImageUploader.module.scss";
import cn from "classnames";
import ImageContainer from "./ImageContainer/ImageContainer";
import ImageTile from "./ImageTile/ImageTile";
import { useUserStore } from "@/services/store/user.store";
import userService from "@/services/user.service";
import { Media, MediaSize } from "@/services/models/Media";

const allBackgroundImages = [
    "https://sun2-17.userapi.com/impg/-iWB4FQBTq4YHJFM5i5QxknJF3SpItEpC2Hadg/CDwlp-9v53c.jpg?size=270x270&quality=95&sign=f85c6a5bd6a6f36cad019f8bbe9142dc&c_uniq_tag=_d9j0FBqD_XcbLYRuAnt3CNzHybAlhv7l3vz3Cm9fig&type=audio",
    "https://sun2-21.userapi.com/impg/RBoGgZ6x1WspFgnaz5DrV_YQkULjolLs-XBMzQ/IoH2huUsxEw.jpg?size=270x270&quality=95&sign=691c8139021d42e62927c2c460fd9acb&c_uniq_tag=LwANZtM-PZ-5B1mcQoMg2SLyQozXbyMiVdIPS0dcccY&type=audio",
    "",
    "",
    "",
    "",
];

const BackgroundImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [mediaList, setMediaList] = useState<Media[]>([]);

    const maxCards = 6;

    const { userProfile, user, fetchUserProfile } = useUserStore();

    useEffect(() => {
        setMediaList([])
        const mediaListWithPlaceholders = (userProfile.mediaList || [])
            .filter((media) => media.size === MediaSize.SMALL)
            .slice(0, maxCards)
            .concat(new Array(maxCards).fill(null))
            .slice(0, maxCards);

        setMediaList(mediaListWithPlaceholders);
        if (Object.keys(userProfile).length === 0 && userProfile?.userId !== user?.id) {
            fetchUserProfile();
        }
    }, [userProfile]);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        userService.addMedia(file, userProfile.id).then((res) => {
            console.log(res);
            setTimeout(() => {
                fetchUserProfile();
            }, 10000);
        });
    };

    // Удаление изображения
    const handleRemoveImage = (image: string) => {};

    // Установить изображение как фоновое
    const handleSetBackground = (image: string) => {};

    const resetTheme = () => {};

    const refresh = () => {
        fetchUserProfile();
    }

    return (
        <Layout noPadding className={styles.container} center>
            <Button onClick={refresh}>Обновить</Button>
            <Typography variant="h2" text="Фото и видео профиля" />
            {error && <Typography variant="p" className={styles.error_message} text={error} />} {/* Отображение ошибки */}
            {uploadProgress !== null && (
                <div>
                    <p>Загрузка: {uploadProgress}%</p>
                    <progress value={uploadProgress} max="100" />
                </div>
            )}
            <Layout horizontal wrap>
                {userProfile.mediaList && userProfile.mediaList.length > 0 ? (
                    <ImageContainer>
                        {mediaList.map((image, index) => (
                            <ImageTile src={image} key={index} />
                        ))}
                    </ImageContainer>
                ) : (
                    <Layout center>
                        <Typography variant="p" text="Сохраненных фоновых изображений нет." />
                    </Layout>
                )}
            </Layout>
            <div className={styles.upload_wrapper}>
                {/* Используем label для взаимодействия с input */}
                <Button type="secondary">
                    <Plus size={18} />
                    Добавить новое
                </Button>
                <input type="file" accept="*" onChange={handleImageChange} className={styles.file_input} />
            </div>
            {/* <Button type="danger" onClick={resetTheme}>
                <Eraser color={"var(--danger)"} size={16} />
                Очистить фон
            </Button> */}
        </Layout>
    );
};

export default BackgroundImageUploader;
