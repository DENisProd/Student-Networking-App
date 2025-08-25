import { useVacancyStore } from "@/services/store/vacancy.store";
import { useProjectStore } from "@/services/store/project.store";
import { useNewsStore } from "@/services/store/news.store";
import { HorizontalListBlock } from "@/components/widgets/HorizontalListBlock/HorizontalListBlock";
import { VacancyCard } from "@/components/widgets/VacancyCard/VacancyCard";
import { ProjectCard } from "@/components/widgets/ProjectCard/ProjectCard";
import { NewsCard } from "@/components/widgets/NewsCard/NewsCard";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button/Button";
import { Bell, UserRound } from "lucide-react";
import Layout from "@/components/ui/Layout/Layout";
import HeaderContainer from "@/components/shared/HeaderContainer/HeaderContainer";
import Avatar from "@/components/ui/Avatar/Avatar";
import { routes } from "@/routes/routes";
import { useUserStore } from "@/services/store/user.store";

export default function WelcomePage() {
  const { vacancies } = useVacancyStore();
  const { projects } = useProjectStore();
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
    <Layout>
      <HeaderContainer left={<CustomLeft />} customLeft right={<Bell color={"var(--text-color)"} size={18}/>}>
          Главная
      </HeaderContainer>
      <Layout>
      <HorizontalListBlock
        title="Вакансии"
        items={vacancies.slice(0, 5)}
        renderItem={vacancy => <VacancyCard key={vacancy.id} {...vacancy} />}
        onAllClick={() => navigate("/vacancies")}
      />
      <HorizontalListBlock
        title="Мои проекты"
        items={projects.slice(0, 5)}
        renderItem={project => <ProjectCard key={project.id} {...project} />}
        onAllClick={() => navigate("/startups")}
      />
      <HorizontalListBlock
        title="Новости стартапов"
        items={news.slice(0, 5)}
        renderItem={newsItem => <NewsCard key={newsItem.id} {...newsItem} />}
        onAllClick={() => navigate("/news")}
      />
    </Layout>
    </Layout>
  );
}
