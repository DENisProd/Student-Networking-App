import BigAvatar from "@/components/ui/BigAvatar/BigAvatar";
import Card from "@/components/ui/Card/Card";
import React from "react";
import styles from "./ProfileHeader.module.scss";
import { useUserStore } from "@/services/store/user.store";
import { Link } from "react-router-dom";
import Typography from "@/components/ui/Typography/Typography";
import Button from "@/components/ui/Button/Button";
import { FileUser, Pencil } from "lucide-react";
import Layout from "@/components/ui/Layout/Layout";
import { routes } from "@/routes/routes";

const ProfileHeader: React.FC = () => {
    const { user } = useUserStore();

    return (
        <>
            <Card className={styles.container}>
                <BigAvatar src={user.avatar || ""} />
                <div className={styles.content}>
                    <Typography variant="h2" text={user?.name} />
                    <Link to={"https://istudent.su/profile"}>
                        <Button type="secondary">
                            <FileUser size={16} />
                            Подробнее
                        </Button>
                    </Link>
                    <Link to={routes.ProfileEdit}>
                        <Button type="secondary">
                            <Pencil size={16} />
                            Редактировать анкету
                        </Button>
                    </Link>
                </div>
            </Card>

            <Card>
                <Layout noPadding center>
                    <Typography variant="h3" text="Подписка PRO" />
                    <Button type="primary">Преобрести PRO</Button>
                    <Button type="secondary">PRO за друга</Button>
                </Layout>
            </Card>
        </>
    );
};

export default ProfileHeader;
