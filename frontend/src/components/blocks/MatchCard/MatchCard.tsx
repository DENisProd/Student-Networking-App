import Card from "@/components/ui/Card/Card";
import Layout from "@/components/ui/Layout/Layout";
import { Match } from "@/services/models/Match";
import React from "react";
import ImageTile from "../ImageUploader/ImageTile/ImageTile";
import Typography from "@/components/ui/Typography/Typography";
import { Link } from "react-router-dom";
import { routes } from "@/routes/routes";

interface Props {
    match: Match;
}

const MatchCard: React.FC<Props> = ({ match }) => {
    return (
        <Link to={routes.Form + "/" + match?.profile?.id}>
            <Card>
                <Layout noPadding>
                    <ImageTile src={match?.profile?.mediaList[0]} square />
                    <Typography variant="p" text={match.profile?.about} />
                    <Typography variant="p" text={match.profile?.description} />
                </Layout>
            </Card>
        </Link>
    );
};

export default MatchCard;
