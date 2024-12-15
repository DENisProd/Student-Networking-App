import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import { Dropdown, Option } from "@/components/ui/DropdownNew/Dropdown";
import Icon from "@/components/ui/Icon/Icon";
import Layout from "@/components/ui/Layout/Layout";
import Typography from "@/components/ui/Typography/Typography";
import CategoryWidget from "@/components/widgets/CategoryWidget/CategoryWidget";
import { Category, CategoryType } from "@/services/models/Category";
import { useCategoryStore } from "@/services/store/category.store";
import { useUserStore } from "@/services/store/user.store";
import { Check, Clapperboard, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

const ProfileInterests = () => {
    const { userProfile, addInterest, removeInterest } = useUserStore();
    const { allCategories, fetchCategories } = useCategoryStore();

    const [selectedCategory, setCategory] = useState<Option | null>(null);
    const [interestList, setInterestList] = useState<Option[]>([]);

    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        const interestCategories = allCategories.filter(c => c.type === CategoryType.INTERESTS)
        if (interestCategories.length === 0) fetchCategories(CategoryType.INTERESTS);
        if (allCategories) {
            const newFavoriteList: Option[] = interestCategories.map((category) => ({
                optionName: category.name,
                value: category.id.toString(),
            }));
            setInterestList(newFavoriteList);
        }
    }, [allCategories]);

    const add = () => {
        if (selectedCategory) addInterest(allCategories.find((interest) => interest.id === +selectedCategory.value));
        setCategory(null);
        setIsEdit(false);
    };

    const remove = (category: Category) => {
        removeInterest(category.id);
    }

    return (
        <Card title={"Интересы"} icon={<Clapperboard />} subtitle={"Выберите интересы, чтобы найти людей с похожими увлечениями."}>
            <Layout noPadding>
                <Layout horizontal noPadding align wrap>
                    {userProfile.interests?.map((interest) => (
                        <CategoryWidget category={interest} isEdit={isEdit} editCallback={remove} />
                    ))}
                </Layout>
                {!isEdit && (
                    <Button type="primary" onClick={() => setIsEdit(true)}>
                        <Pencil size={16} />
                        Изменить
                    </Button>
                )}

                {isEdit && (
                    <Layout noPadding align horizontal>
                        <Dropdown
                            defaultValue={null}
                            optionList={interestList}
                            selectedValue={selectedCategory}
                            setSelectedValue={setCategory}
                            placeholder={"Интерес"}
                            invertedColor
                            canWrite
                        />
                        <Button onClick={add}>
                            <Check size={18} />
                            Добавить
                        </Button>
                    </Layout>
                )}
            </Layout>
        </Card>
    );
};

export default ProfileInterests;
