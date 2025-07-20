import React from 'react';
import styles from './Typography.module.scss';
import cn from 'classnames';

interface Props {
    text?: string;
    variant: "h1" | "h2" | "h3" | "h4" | "p";
    weight?: "bold" | "italic" | "regular";
    className?: string;
    vclamp3?: boolean;
    vclamp2?: boolean;
    onClamp?: boolean;
    margin?: boolean;
}

const Typography: React.FC<Props> = ({ text, variant, vclamp2, vclamp3, className, onClamp, margin, weight }) => {

    const baseClassNames = cn(styles.base, onClamp && (vclamp2 ? styles.vertical_clamp2 : styles.horizontal_clamp), onClamp && (vclamp3 ? styles.vertical_clamp3 : styles.horizontal_clamp), margin && styles.margin, weight && styles[weight], className )

    if (!text) return <div className={styles.wait_block}></div>;

    switch (variant) {
        case "h1":
            return <h1 className={cn(baseClassNames, styles.h1)}>{text}</h1>;
        case "h2":
            return <h2 className={cn(baseClassNames, styles.h2)}>{text}</h2>;
        case "h3":
            return <h3 className={cn(baseClassNames, styles.h3)}>{text}</h3>;
        case "h4":
            return <h4 className={cn(baseClassNames, styles.h4)}>{text}</h4>;
        case "p":
            return <p className={cn(baseClassNames, styles.p)}>{text}</p>;
        default:
            return <p className={cn(baseClassNames, styles.p)}>{text}</p>;
    }
}

export default Typography
