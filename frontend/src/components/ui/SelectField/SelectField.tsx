import React, { useState, useRef, useEffect, SelectHTMLAttributes } from "react";
import styles from "./SelectField.module.scss";
import cn from "classnames";

export interface IOption {
    value: string;
    label: React.ReactNode;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
    options: IOption[];
    value: string;
    onSelectValue: (value: string) => void;
    label?: string;
    placeholder?: string;
    inverted?: boolean;
}

const SelectField: React.FC<SelectProps> = ({ options, value, onSelectValue, label, placeholder, inverted, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLSelectElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleSelect = (option: IOption) => {
        onSelectValue(option.value);
        if (selectRef.current) {
            selectRef.current.value = option.value;
        }
    };

    const onSelected = (option: IOption) => {
        handleSelect(option);
        setIsOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            setIsOpen(!isOpen);
        } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            const currentIndex = options.findIndex((option) => option.value === value);
            const nextIndex =
                event.key === "ArrowDown" ? (currentIndex + 1) % options.length : (currentIndex - 1 + options.length) % options.length;
            handleSelect(options[nextIndex]);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            {label && <label className={styles.title}>{label}</label>}

            <select
                ref={selectRef}
                value={value}
                onChange={(e) => onSelectValue(e.target.value)}
                className={styles.hidden_select}
                {...props}
            >
                {placeholder && (
                    <option className={styles.placeholder} value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label || ""}
                    </option>
                ))}
            </select>

            <div
                className={cn(
                    styles.select_header,
                    inverted && styles.inverted_colors,
                    !options.find((option) => option.value === value)?.label && styles.placeholder
                )}
                tabIndex={0}
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
            >
                {options.find((option) => option.value === value)?.label || placeholder || ""}
            </div>

            <ul className={cn(styles.options, isOpen && styles.visible)}>
                {options.map((option) => (
                    <li key={option.value} onClick={() => onSelected(option)} className={cn({ [styles.selected]: option.value === value })}>
                        {option.label || ""}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectField;
