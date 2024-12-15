import CreateCategoryForm from "@/components/forms/CreateCategoryForm/CreateCategoryForm";
import HeaderContainer from "@/components/shared/HeaderContainer/HeaderContainer";
import BackButton from "@/components/ui/BackButton/BackButton";
import Button from "@/components/ui/Button/Button";
import Layout from "@/components/ui/Layout/Layout";
import Typography from "@/components/ui/Typography/Typography";
import WrapList from "@/components/ui/WrapList/WrapList";
import CategoryWidget from "@/components/widgets/CategoryWidget/CategoryWidget";
import { CategoryType, categoryTypeList } from "@/services/models/Category";
import { useCategoryStore } from "@/services/store/category.store";
import { getListOfTypes } from "@/services/utils/optionListFromObject";
import React, { useEffect } from "react";

const CategoryManagementPage = () => {
    const { selectedCategory, allCategories, fetchCategories, setSelectedCategory } = useCategoryStore();

    const categoriesList = getListOfTypes(categoryTypeList);

    useEffect(() => {
        if (allCategories.filter((c) => c.type === selectedCategory).length === 0) refreshCategories();
    }, []);

    useEffect(() => {
        refreshCategories();
    }, [selectedCategory]);

    const refreshCategories = () => {
        fetchCategories(selectedCategory);
    };

    return (
        <Layout paddingBottom noPadding>
            <HeaderContainer left={<BackButton />}>
                <Typography text={"Редактирование категорий"} variant="h2" />
            </HeaderContainer>
            <Layout>
                <Layout noPadding horizontal>
                    {categoriesList.map(category => (
                        <Button 
                            type={category.value === selectedCategory ? "primary" : "tertiary"} 
                            onClick={() => setSelectedCategory(category.value as CategoryType)}
                            key={category.value} 
                        >
                            {category.label}
                        </Button>
                    ))}
                </Layout>

                <CreateCategoryForm refresh={refreshCategories} />

                <WrapList wrap>
                    {allCategories
                        .filter((c) => c.type === selectedCategory)
                        .map((category) => (
                            <CategoryWidget category={category} negative key={category?.id}/>
                        ))
                    }
                </WrapList>
            </Layout>
        </Layout>
    );
};

export default CategoryManagementPage;
