import styles from "./BottomNavigation.module.scss";
import { navigationTabs } from "../data";
import NavigationTab from "../NavigationTab/NavigationTab";
import cn from "classnames";
import { useLocation } from "react-router-dom";
import { routes } from "@/routes/routes";
import { useNavigationStore } from "@/services/store/navigation.store";

const BottomNavigation = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const { isHidden, showNavigation } = useNavigationStore();

    // useEffect(() => {
    //     if (!pathname.includes("view")) showNavigation();
    // }, [pathname])

    return (
        <div className={cn(styles.BottomNavigation, isHidden && styles.hidden)}>
            {navigationTabs.map((tab) => {
                const isActive = tab.link === pathname || (tab.link !== "/" && pathname.startsWith(tab.link));

                return <NavigationTab key={tab.link} tab={tab} active={isActive} />;
            })}
        </div>
    );
};

export default BottomNavigation;
