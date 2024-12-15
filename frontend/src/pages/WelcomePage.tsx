import HeaderContainer from '@/components/shared/HeaderContainer/HeaderContainer'
import Avatar from '@/components/ui/Avatar/Avatar';
import Button from '@/components/ui/Button/Button';
import Layout from '@/components/ui/Layout/Layout'
import { routes } from '@/routes/routes';
import { useUserStore } from '@/services/store/user.store';
import { Bell, UserRound } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const handleProfileClick = () => {
    navigate(routes.Profile);
  };

  const CustomLeft = () => {
    if (!user?.id)
        return (
            <Button type="tertiary" circle onClick={handleProfileClick}>
                <UserRound size={18} />
            </Button>
        );

    return (
        <Button type="transparent" onClick={handleProfileClick} noPadding>
            <Avatar src={user.avatar || ""} size={36} />
        </Button>
    );
};

  return (
    <Layout noPadding>
      <HeaderContainer left={<CustomLeft />} customLeft right={<Bell size={18}/>}>
          Главная
      </HeaderContainer>
    </Layout>
  )
}

export default WelcomePage
