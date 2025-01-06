import MatchList from "@/components/blocks/MatchList/MatchList";
import ReactsList from "@/components/blocks/ReactsList/ReactsList";
import HeaderContainer from "@/components/shared/HeaderContainer/HeaderContainer";
import BackButton from "@/components/ui/BackButton/BackButton";
import Layout from "@/components/ui/Layout/Layout";
import Typography from "@/components/ui/Typography/Typography";

const MatchPage = () => {
    return (
        <Layout paddingBottom noPadding>
            <HeaderContainer left={<BackButton />}>
                <Typography text={"Взаимности"} variant="h2" />
            </HeaderContainer>
            <Layout>
                <MatchList />
                <ReactsList />
            </Layout>
        </Layout>
    );
};

export default MatchPage;
