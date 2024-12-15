import React from "react";
import styles from "./MediaCount.module.scss";
import cn from "classnames";

interface Props {
    count: number;
    selected: number;
}

const MediaCount: React.FC<Props> = ({ count, selected }) => {
    const getSquares = () => {
        const squares = [];
        for (let i = 0; i < count; i++) {
            squares.push(<div key={i} className={cn(styles.square, i == selected && styles.selected)}></div>);
        }
        return squares;
    };

    return <div className={styles.square_container}>{getSquares()}</div>;
};

export default MediaCount;
