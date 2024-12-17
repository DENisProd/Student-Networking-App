import HeaderContainer from '@/components/shared/HeaderContainer/HeaderContainer'
import BackButton from '@/components/ui/BackButton/BackButton'
import Layout from '@/components/ui/Layout/Layout'
import Typography from '@/components/ui/Typography/Typography'
import React from 'react'

const MatchPage = () => {
  return (
    <Layout paddingBottom>
            <HeaderContainer left={<BackButton />}>
                <Typography text={"Взаимности"} variant="h2" />
            </HeaderContainer>
            
        </Layout>
  )
}

export default MatchPage
