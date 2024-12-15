import React from "react";
import styles from "./HeaderContainer.module.scss";
import cn from "classnames";
import Button from "@/components/ui/Button/Button";

interface Props {
    left?: React.ReactNode;
    leftHandler?: () => void;
    customLeft?: boolean;
    children: React.ReactNode;
    right?: React.ReactNode;
    rightHandler?: () => void;
    customRight?: boolean;
}

const HeaderContainer: React.FC<Props> = ({ left, children, right, leftHandler, rightHandler, customLeft, customRight }) => {

    const handleLeftClick = () => {
        if (leftHandler) leftHandler();
    };

    const handleRightClick = () => {
        if (rightHandler) rightHandler();
    };

    return (
        <div className={cn(styles.container)}>
            <div className={styles.left}>
                {left && !customLeft && (
                    <Button onClick={handleLeftClick} type="tertiary" circle>
                        {left}
                    </Button>
                )}
                {left && customLeft && <>{left}</>}
            </div>
            <div className={styles.text}>{children}</div>
            <div className={styles.right}>
                {right && !customRight && (
                    <Button onClick={handleRightClick} type="tertiary" circle>
                        {right}
                    </Button>
                )}
                {right && customRight && <>{right}</>}
            </div>
        </div>
    );
};

export default HeaderContainer;
