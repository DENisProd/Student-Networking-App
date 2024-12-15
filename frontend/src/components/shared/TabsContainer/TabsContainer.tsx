import React, { useEffect, useState } from "react";
import Tab from "./Tab/Tab";
import styles from "./TabsContainer.module.scss";
import cn from "classnames";

export interface ITab {
    label?: string;
    value: string;
    icon?: React.ReactNode;
}

interface Props {
    tabs: Array<ITab>;
    selected: string;
    selectTab?: (value: string) => void;
    className?: string;
    negative?: boolean;
}

const TabsContainer: React.FC<Props> = ({ tabs, selected, selectTab, className, negative }) => {
    const [selectedTab, setSelectedTab] = useState<string>(selected);

    const selectTabHandler = (value: string) => {
        setSelectedTab(value);
        selectTab && selectTab(value);
    };

    useEffect(() => {
        setSelectedTab(selected);
    }, [selected])

    return (
        <div className={cn(styles.TabsContainer, className)}>
            {tabs.map((tab) => (
                <Tab negative={negative} selectTabHandler={selectTabHandler} tab={tab} active={selectedTab.includes(tab.value)} key={tab.value}/>
            ))}
        </div>
    );
};

export default TabsContainer;
