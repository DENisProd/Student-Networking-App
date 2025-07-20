import { useVacancyStore } from "@/services/store/vacancy.store";
import { useStartupStore } from "@/services/store/startup.store";
import { useNewsStore } from "@/services/store/news.store";
import { HorizontalListBlock } from "@/components/widgets/HorizontalListBlock/HorizontalListBlock";
import { VacancyCard } from "@/components/widgets/VacancyCard/VacancyCard";
import { StartupCard } from "@/components/widgets/StartupCard/StartupCard";
import { NewsCard } from "@/components/widgets/NewsCard/NewsCard";
import { useNavigate } from "react-router-dom";
import { Bell, UserRound } from "lucide-react";
import HeaderContainer from "@/components/shared/HeaderContainer/HeaderContainer";
import Layout from "@/components/ui/Layout/Layout";
import Button from "@/components/ui/Button/Button";
import Avatar from "@/components/ui/Avatar/Avatar";
import { routes } from "@/routes/routes";
import { useUserStore } from "@/services/store/user.store";

export default function WelcomePage() {
  const { vacancies } = useVacancyStore();
  const { startups } = useStartupStore();
  const { news } = useNewsStore();
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
      <HorizontalListBlock
        title="Вакансии"
        items={vacancies}
        renderItem={vacancy => <VacancyCard key={vacancy.id} {...vacancy} />}
        onAllClick={() => navigate("/vacancies")}
      />
      <HorizontalListBlock
        title="Топ стартапов"
        items={startups}
        renderItem={startup => <StartupCard key={startup.id} {...startup} />}
        onAllClick={() => navigate("/startups")}
      />
      <HorizontalListBlock
        title="Новости стартапов"
        items={news}
        renderItem={newsItem => <NewsCard key={newsItem.id} {...newsItem} />}
        onAllClick={() => navigate("/news")}
      />
    </Layout>
  );
}
