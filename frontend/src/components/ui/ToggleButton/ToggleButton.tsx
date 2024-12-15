import styles from "./ToggleButton.module.scss";
import cn from "classnames";

interface Props {
    isOn: boolean;
    toggle: (value: boolean) => void;
    label?: string;
}

const ToggleButton: React.FC<Props> = ({ isOn, toggle, label }) => (
    <div className={styles.container} onClick={() => toggle(!isOn)}>
        <div className={styles.btn}>
            <div className={cn(styles.circle, isOn ? styles.on : styles.off)} />
        </div>
        <div>{label || "Включить"}</div>
    </div>
);

export default ToggleButton;
