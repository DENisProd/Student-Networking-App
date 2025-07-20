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
    const { selectedCategory, allCategories, fetchCategories, setSelectedCategory, isLoading, error } = useCategoryStore();

    const categoriesList = getListOfTypes(categoryTypeList);

    useEffect(() => {
        if (allCategories.filter((c) => c.type === selectedCategory).length === 0) refreshCategories();
    }, []);

    useEffect(() => {
        refreshCategories();
    }, [selectedCategory]);

    // Логируем для отладки
    useEffect(() => {
        console.log('CategoryManagementPage - allCategories:', allCategories);
        console.log('CategoryManagementPage - selectedCategory:', selectedCategory);
        console.log('CategoryManagementPage - isLoading:', isLoading);
        console.log('CategoryManagementPage - error:', error);
    }, [allCategories, selectedCategory, isLoading, error]);

    const refreshCategories = () => {
        console.log('Refreshing categories for type:', selectedCategory);
        fetchCategories(selectedCategory);
    };

    return (
        <Layout paddingBottom noPadding>
            <HeaderContainer left={<BackButton />}>
                <Typography text={"Редактирование категорий"} variant="h2" />
            </HeaderContainer>
            <Layout>
                {isLoading && <div>Загрузка категорий...</div>}
                {error && <div style={{color: 'red'}}>Ошибка: {error}</div>}
                
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

                <Button onClick={refreshCategories} disabled={isLoading}>
                    Обновить категории
                </Button>

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
