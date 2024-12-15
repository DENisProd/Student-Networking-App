import React from "react";
import BackgroundImageUploader from "../ImageUploader/BackgroundImageUploader";
import Card from "@/components/ui/Card/Card";
import { BookImage } from "lucide-react";
import Layout from "@/components/ui/Layout/Layout";

const ProfilePhotos = () => {
    return (
        <Card title={"Фото и видео"} icon={<BookImage />} subtitle={"Каждое фото или видео увеличивают заполненность анкеты на 5%."}>
            <Layout noPadding>
                <BackgroundImageUploader />
            </Layout>
        </Card>
    );
};

export default ProfilePhotos;
