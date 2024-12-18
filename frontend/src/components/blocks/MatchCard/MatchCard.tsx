import Card from '@/components/ui/Card/Card';
import Layout from '@/components/ui/Layout/Layout';
import { Match } from '@/services/models/Match';
import React from 'react'
import ImageTile from '../ImageUploader/ImageTile/ImageTile';
import Typography from '@/components/ui/Typography/Typography';

interface Props {
    match: Match;
}

const MatchCard: React.FC<Props> = ({ match }) => {
  return (
    <Card>
      <Layout noPadding>
        <ImageTile src={match.user.media} horizontal/>
        <Typography variant='p' text={match.user.about} />
        <Typography variant='p' text={match.user.description} />
      </Layout>
    </Card>
  )
}

export default MatchCard
