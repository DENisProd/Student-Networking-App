import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import { Dropdown, Option } from "@/components/ui/DropdownNew/Dropdown";
import Icon from "@/components/ui/Icon/Icon";
import Layout from "@/components/ui/Layout/Layout";
import Typography from "@/components/ui/Typography/Typography";
import CategoryWidget from "@/components/widgets/CategoryWidget/CategoryWidget";
import { CategoryType } from "@/services/models/Category";
import { useCategoryStore } from "@/services/store/category.store";
import { useUserStore } from "@/services/store/user.store";
import { Check, Crosshair, Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";

const ProfileTarget = () => {
    const { userProfile, setTarget } = useUserStore();
    const { allCategories, fetchCategories, isLoading, error } = useCategoryStore();

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [selectedCategory, setCategory] = useState<Option | null>(null);
    const [targetList, setTargetList] = useState<Option[]>([]);

    useEffect(() => {
        const targetCategories = allCategories.filter(c => c.type === CategoryType.TARGET)
        if (targetCategories.length === 0) {
            console.log('Fetching target categories...');
            fetchCategories(CategoryType.TARGET);
        }
        if (allCategories) {
            const newTargetList: Option[] = targetCategories.map((category) => ({
                optionName: category.name,
                value: category.id.toString(),
            }));
            setTargetList(newTargetList);
        }
    }, [allCategories]);

    // Логируем ошибки
    useEffect(() => {
        if (error) {
            console.error('Category error:', error);
        }
    }, [error]);

    const set = () => {
        setIsEdit(false);
        setTarget(allCategories.filter(c => c.type === CategoryType.TARGET).find((target) => target.id === +selectedCategory.value));
    };

    return (
        <Card title={"Цель поиска"} icon={<Crosshair />}>
            <Layout noPadding>
                {isLoading && <div>Загрузка целей...</div>}
                {error && <div style={{color: 'red'}}>Ошибка загрузки целей: {error}</div>}
                
                <Layout noPadding horizontal>
                    <CategoryWidget category={userProfile?.target} />
                    {!isEdit && (
                        <Button type="primary" onClick={() => setIsEdit(true)}>
                            <Pencil size={16} />
                            Изменить
                        </Button>
                    )}
                </Layout>
                {isEdit && (
                    <Layout noPadding align horizontal>
                        <Dropdown
                            defaultValue={null}
                            optionList={targetList}
                            selectedValue={selectedCategory}
                            setSelectedValue={setCategory}
                            placeholder={"Интерес"}
                            invertedColor
                            canWrite
                        />
                        <Button onClick={set}>
                            <Check size={18} />
                            Выбрать
                        </Button>
                    </Layout>
                )}
            </Layout>
        </Card>
    );
};

export default ProfileTarget;
