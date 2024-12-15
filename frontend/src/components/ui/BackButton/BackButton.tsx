"use client";

import { MoveLeft } from "lucide-react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigation = useNavigate();
    const backHandler = () => {
        navigation(-1);
    };

    return (
        <Button type="tertiary" circle noPadding onClick={backHandler}>
            <MoveLeft size={20}/>
        </Button>
    );
};

export default BackButton;
