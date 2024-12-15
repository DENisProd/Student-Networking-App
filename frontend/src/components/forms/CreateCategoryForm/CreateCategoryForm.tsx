"use client";

import Layout from "@/components/ui/Layout/Layout";
import TextField from "@/components/ui/TextField/TextField";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./CreateCategoryForm.module.scss";
import Card from "@/components/ui/Card/Card";
import throttle from "lodash.throttle";
import Icon from "@/components/ui/Icon/Icon";
import Typography from "@/components/ui/Typography/Typography";
import Button from "@/components/ui/Button/Button";
import { Plus } from "lucide-react";
import { useCategoryStore } from "@/services/store/category.store";
// import { useNavigate } from "react-router-dom";

interface Props {
    refresh: () => void;
}
const CreateCategoryForm: React.FC<Props> = ({ refresh }) => {
    // const navigate = useNavigate();
    const [selectedColor, setSelectedColor] = useState<string>("#ffffff");
    const [svgContent, setSvgContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { create, selectedCategory } = useCategoryStore();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid },
        reset
    } = useForm({
        defaultValues: {
            categoryName: "",
            color: "",
            image: "",
            isCustomize: true,
        },
        mode: "onBlur",
    });

    const throttledSetColor = useCallback(
        throttle((value: string) => {
            setSelectedColor(value);
        }, 200),
        []
    );

    const categoryName = watch("categoryName");

    const onSubmitHandler = handleSubmit((data) => {
        setIsLoading(true);
        create({
            name: data.categoryName,
            type: selectedCategory,
            color: selectedColor.replace('#', ''),
            icon: svgContent || "",
            isCustomize: data.isCustomize,
        }).then(res => {
            setIsLoading(false);
            reset();
            setSvgContent(null);
            if (refresh) refresh();
        })
    });

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "image/svg+xml") {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSvgContent(event.target?.result as string);
            };
            reader.readAsText(file);
        }
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <Layout noPadding>
                <TextField
                    title={"Название категории"}
                    props={{
                        placeholder: "Название категории",
                        ...register("categoryName", { required: true }),
                    }}
                    error={errors.categoryName && { message: "Обязательное поле" }}
                />
                <Layout horizontal noPadding>
                    <TextField
                        title={"Загрузить иконку (SVG)"}
                        props={{
                            type: "file",
                            accept: "image/svg+xml",
                            onChange: handleImageChange,
                        }}
                    />
                    <TextField
                        title={"Цвет фона"}
                        props={{
                            type: "color",
                            ...register("color", {
                                onChange: (e) => throttledSetColor(e.target.value),
                            }),
                        }}
                        className={styles.color_input}
                    />
                    <TextField
                    title={"Настраиваемая категория"}
                    props={{
                        type: "checkbox",
                        ...register("isCustomize"),
                    }}
                    className={styles.checkbox}
                />
                </Layout>
                {categoryName && (
                    <Layout noPadding>
                        <Card medium square className={styles.card}>
                            <Layout horizontal noPadding align>
                                {svgContent && <Icon svgContent={svgContent} size={32} fillColor={selectedColor} />}
                                <Typography variant="h3" text={categoryName} />
                            </Layout>
                        </Card>
                    </Layout>
                )}
                <Button isSubmit size="large" isLoading={isLoading} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            Создание категории...  
                        </>
                    ) : (
                        <>
                            <Plus size={18} />
                            Создать категорию
                        </>
                    )}
                </Button>
            </Layout>
        </form>
    );
};

export default CreateCategoryForm;
