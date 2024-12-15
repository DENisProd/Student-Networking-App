import Button from "@/components/ui/Button/Button";
import React from "react";
import styles from "./Tab.module.scss";
import cn from "classnames";
import { ITab } from "../TabsContainer";

interface Props {
    label?: string;
    active?: boolean;
    selectTabHandler: (value: string) => void;
    tab: ITab;
    negative?: boolean;
}

const Tab: React.FC<Props> = ({ active, selectTabHandler, tab, negative }) => {
    return (
        <Button
            square
            onClick={() => selectTabHandler(tab.value)}
            className={cn(styles.Tab, active && styles.active)}
            type={active ? "primary" : (negative ? "secondary" : "tertiary")}
            hover={"none"}
            fontSize={"regular"}
        >
            {tab?.icon}
            {tab?.label}
        </Button>
    );
};

export default Tab;
