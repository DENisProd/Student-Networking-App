import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import Layout from "@/components/ui/Layout/Layout";
import TextArea from "@/components/ui/TextField/TextArea";
import TextField from "@/components/ui/TextField/TextField";
import { useUserStore } from "@/services/store/user.store";
import { Contact } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ProfileAbout = () => {
    const { userProfile, updateUser, fetchUserProfile } = useUserStore();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid },
        reset,
    } = useForm({
        defaultValues: {
            about: "",
            description: "",
            name: "",
            age: 0,
        },
        mode: "onBlur",
    });

    const onSubmitHandler = handleSubmit((data) => {
        updateUser({ ...data });
        fetchUserProfile();
    });

    useEffect(() => {
        if (userProfile) {
            setValue("about", userProfile?.about);
            setValue("description", userProfile?.description);
            setValue("name", userProfile?.name);
            setValue("age", userProfile?.age);
        }
    }, [userProfile]);

    return (
        <Card
            title={"О себе"}
            icon={<Contact />}
            subtitle={"За рассказ о себе увеличим заполненность анкеты от 5% до 15%. Поля «Образование» и «Работа» увеличат на 5%."}
        >
            <form onSubmit={onSubmitHandler}>
                <Layout noPadding>
                    <TextArea
                        title={"О себе"}
                        negative
                        props={{
                            placeholder: "Введите свою информацию о себе",
                            rows: 5,
                            maxLength: 250,
                            ...register("about", { required: true }),
                        }}
                        error={errors.about && { message: "Обязательное поле" }}
                    />

                    <TextArea
                        title={"Описание цели поиска"}
                        negative
                        props={{
                            placeholder: "Что вы хотите получить от нашего сервиса?",
                            rows: 5,
                            maxLength: 250,
                            ...register("description"),
                        }}
                    />

                    <TextField
                        title={"Ваше имя"}
                        negative
                        props={{
                            placeholder: "Введите ваше имя",
                            maxLength: 25,
                            ...register("name", { required: true }),
                        }}
                        error={errors.name && { message: "Некорректное имя" }}
                    />

                    <TextField
                        title={"Ваш возраст"}
                        negative
                        props={{
                            placeholder: "Введите ваш возраст",
                            type: "number",
                            min: 14,
                            max: 99,
                            ...register("age", { min: 14, max: 99, required: true }),
                        }}
                        error={errors.age && { message: "Некорректный возраст" }}
                    />

                    <Button isSubmit size="large">
                        Сохранить изменения
                    </Button>
                </Layout>
            </form>
        </Card>
    );
};

export default ProfileAbout;
