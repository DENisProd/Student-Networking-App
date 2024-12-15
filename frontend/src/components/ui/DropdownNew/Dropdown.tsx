import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './dropdown.module.scss';

export interface Option {
    optionName: string;
    value: string;
}

interface DropdownProps {
    defaultValue: Option | null;
    optionList: Option[];
    selectedValue: Option | null;
    setSelectedValue: (value: Option) => void;
    next?: () => void;
    placeholder: string;
    isDisplayEmpty?: boolean;
    canWrite?: boolean;
    invertedColor?: boolean;
    filterFunction?: (option: Option, searchValue: string) => boolean;
}

export interface DropdownRef {
    focus: () => void;
    clear: () => void;
}

export const Dropdown = forwardRef<DropdownRef, DropdownProps>(({
    defaultValue,
    optionList,
    selectedValue,
    setSelectedValue,
    next,
    placeholder,
    isDisplayEmpty = true,
    canWrite = false,
    invertedColor = false,
    filterFunction,
}, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [value, setValue] = useState<string>('');
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [list, setList] = useState<Option[]>(optionList);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [defaultApplied, setDefaultApplied] = useState<boolean>(false);

    useEffect(() => {
        setList(optionList);
    }, [optionList]);

    useEffect(() => {
        if (!defaultApplied && defaultValue) {
            setValue(defaultValue.optionName);
            setSelectedValue(defaultValue);
            setDefaultApplied(true);
        }
    }, [defaultValue, setSelectedValue, defaultApplied]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setMenuVisible(false);
            }
        };

        if (isMenuVisible) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMenuVisible]);

    const filterFunctionDefault = (item: Option, searchValue: string) => {
        return item.optionName.toLowerCase().includes(searchValue.toLowerCase());
    };

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (canWrite) {
            const searchValue = event.target.value;
            setValue(searchValue);

            const _filterFunction = filterFunction || filterFunctionDefault;
            setList(optionList.filter((item) => _filterFunction(item, searchValue)));
            setSelectedIndex(0);
        }
    };

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (isMenuVisible) {
            if (event.key === 'ArrowDown') {
                setSelectedIndex((prevState) => (prevState >= list.length - 1 ? 0 : prevState + 1));
            } else if (event.key === 'ArrowUp') {
                setSelectedIndex((prevState) => (prevState <= 0 ? list.length - 1 : prevState - 1));
            } else if (event.key === 'Enter' && list[selectedIndex]) {
                selectOption(list[selectedIndex]);
                if (next) next();
            }
        }
    };

    const selectOption = (option: Option) => {
        setValue(option.optionName);
        setMenuVisible(false);
        setSelectedValue(option);
    };

    useImperativeHandle(ref, () => ({
        focus() {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        },
        clear() {
            selectOption({ optionName: '', value: '' });
        },
    }));

    return (
        <div className={styles.container} ref={containerRef}>
            {canWrite ? (
                <input
                    className={cn(invertedColor && styles.inverted)}
                    value={value}
                    onChange={changeHandler}
                    ref={inputRef}
                    onKeyDown={onKeyDownHandler}
                    placeholder={placeholder || ''}
                    onClick={() => setMenuVisible((prevState) => !prevState)}
                />
            ) : (
                <div
                    className={cn(styles.nonWritableInput, invertedColor && styles.inverted)}
                    onClick={() => setMenuVisible((prevState) => !prevState)}
                    ref={inputRef}
                >
                    {value || <span className={styles.placeholder}>{placeholder}</span>}
                </div>
            )}

            <span className={cn(styles.arrow, isMenuVisible && styles.open)}>
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.2153 1.07179L2.21548 1.07158L2.20958 1.06704C1.88758 0.819464 1.43024 0.847316 1.13897 1.14914C0.820342 1.47932 0.820342 2.01322 1.13897 2.3434L7.41881 8.85086L7.41861 8.85105L7.42409 8.85595L7.50487 8.92821L7.50468 8.92842L7.51059 8.93296C7.83259 9.18054 8.28993 9.15268 8.58119 8.85086L14.861 2.3434L14.8612 2.34359L14.8659 2.33797L14.9356 2.25427L14.9358 2.25444L14.9401 2.24848C15.1768 1.91796 15.1509 1.44956 14.861 1.14914L14.8612 1.14895L14.8557 1.14405L14.775 1.07179L14.7752 1.07158L14.7692 1.06704C14.4472 0.819464 13.9899 0.847316 13.6986 1.14914L13.7706 1.21858L13.6986 1.14914L8 7.05458L2.30136 1.14914L2.30155 1.14895L2.29607 1.14405L2.2153 1.07179Z"
                        fill="white"
                        stroke="black"
                        strokeWidth="0.2"
                    />
                </svg>
            </span>

            <div className={cn(styles.menu, isMenuVisible && styles.open)}>
                {Array.isArray(list) && (
                    <>
                        {list.length > 0 ? (
                            list.map((row, index) => (
                                <div
                                    key={row.value}
                                    className={cn(styles.option, index === selectedIndex && styles.selected)}
                                    onClick={() => selectOption(row)}
                                >
                                    {row.optionName}
                                </div>
                            ))
                        ) : (
                            isDisplayEmpty && (
                                <div className={styles.sub_title}>
                                    <div className={styles.option}>Номера пар не найдены</div>
                                </div>
                            )
                        )}
                    </>
                )}
            </div>
        </div>
    );
});
