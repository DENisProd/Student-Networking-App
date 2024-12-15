import styles from "./HeaderContainer.module.scss";
import Typography from "@/components/ui/Typography/Typography";
import cn from "classnames";

const HeaderWrapper = () => {
    return (
        <div className={styles.container}>
            <div className={cn(styles.btn_skeleton, styles.left)} />
            <div className={styles.text}>
                <Typography text={undefined} variant="h3" />
            </div>
            <div className={cn(styles.btn_skeleton, styles.right)} />
        </div>
    );
};

export default HeaderWrapper;
