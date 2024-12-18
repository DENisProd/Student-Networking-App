import PageLayout from "@/components/ui/Page/PageLayout";
import React from "react";

interface Props {
    children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
    return (
        <PageLayout>
            {children}
        </PageLayout>
    );
};

export default MainLayout;
