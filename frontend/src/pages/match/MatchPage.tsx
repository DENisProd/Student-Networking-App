import MatchCard from '@/components/blocks/MatchCard/MatchCard'
import HeaderContainer from '@/components/shared/HeaderContainer/HeaderContainer'
import BackButton from '@/components/ui/BackButton/BackButton'
import Layout from '@/components/ui/Layout/Layout'
import Typography from '@/components/ui/Typography/Typography'
import { useMatchStore } from '@/services/store/match.store'
import { useUserStore } from '@/services/store/user.store'
import React, { useEffect } from 'react'

const MatchPage = () => {
  const { matches, fetchMatches } = useMatchStore();
  const { userProfile } = useUserStore();

  useEffect(() => {
      fetchMatches();
  }, [userProfile])

  return (
    <Layout paddingBottom>
            <HeaderContainer left={<BackButton />}>
                <Typography text={"Взаимности"} variant="h2" />
            </HeaderContainer>
            <Layout noPadding>
              {matches.map(match => (
                <MatchCard match={match}/>
              ))}
            </Layout>
        </Layout>
  )
}

export default MatchPage
