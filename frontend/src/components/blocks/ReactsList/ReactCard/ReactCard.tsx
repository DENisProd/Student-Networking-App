import Card from "@/components/ui/Card/Card";
import Layout from "@/components/ui/Layout/Layout";
import React from "react";
import ImageTile from "../../ImageUploader/ImageTile/ImageTile";
import Typography from "@/components/ui/Typography/Typography";
import { ReactResponse } from "@/services/models/Reacts";
import { routes } from "@/routes/routes";
import { Link } from "react-router-dom";

interface Props {
    reacts: ReactResponse;
}

const ReactCard: React.FC<Props> = ({ reacts }) => {
    return (
        <Link to={routes.Form + "/" + reacts?.profile?.id}>
            <Card>
                <Layout noPadding>
                    <ImageTile src={reacts.profile.mediaList[0]} square />
                    <Typography variant="p" text={reacts.profile.about} />
                    <Typography variant="p" text={reacts.profile.description} />
                </Layout>
            </Card>
        </Link>
    );
};

export default ReactCard;
