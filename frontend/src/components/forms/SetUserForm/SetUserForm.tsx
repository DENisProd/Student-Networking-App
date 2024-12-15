import Button from "@/components/ui/Button/Button";
import Layout from "@/components/ui/Layout/Layout";
import TextField from "@/components/ui/TextField/TextField";
import { useUserStore } from "@/services/store/user.store";
import React from "react";
import { useForm } from "react-hook-form";

const SetUserForm = () => {
    const { fetchUser, user } = useUserStore();

    const { register, handleSubmit } = useForm({
        defaultValues: {
            userIndex: 0,
        },
        mode: "onBlur",
    });

    const onSubmitHandler = handleSubmit((data) => {
        console.log(data);
        fetchUser(+data.userIndex);
    });

    return (
        <form onSubmit={onSubmitHandler}>
            <Layout noPadding>
                <TextField
                    title={"Номер пользователя: " + user?.name}
                    props={{
                        placeholder: "Номер пользователя",
                        ...register("userIndex", { required: true }),
                    }}
                />
                <Button isSubmit size="large">
                    Выбрать
                </Button>
            </Layout>
        </form>
    );
};

export default SetUserForm;
