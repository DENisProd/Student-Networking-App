import React from "react";
import styles from "./PageLayout.module.scss";
import cn from "classnames";
import Layout from "../Layout/Layout";

interface Props {
    children: React.ReactNode;
    adaptive?: boolean;
    noPadding?: boolean;
    paddingBottom?: boolean;
}

const PageLayout: React.FC<Props> = ({ children, adaptive, noPadding }) => {
    return <Layout noPadding={noPadding} paddingBottom className={cn(styles.container, adaptive && styles.adaptive)}>{children}</Layout>;
};

export default PageLayout;
