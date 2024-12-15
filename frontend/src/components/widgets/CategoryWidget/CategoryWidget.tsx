import React from "react";
import styles from "./CategoryWidget.module.scss";
import cn from "classnames";
import { Category } from "@/services/models/Category";
import Icon from "@/components/ui/Icon/Icon";
import Typography from "@/components/ui/Typography/Typography";
import Button from "@/components/ui/Button/Button";
import { X } from "lucide-react";

interface Props {
    category: Category;
    negative?: boolean;
    isEdit?: boolean;
    editCallback?: (category: Category) => void;
}

const CategoryWidget: React.FC<Props> = ({ negative, category, isEdit, editCallback }) => {
    const click = () => {
        if (editCallback) editCallback(category);
    }
    return (
        <div className={cn(styles.category, negative && styles.negative)}>
            {category?.icon?.length > 10 && <Icon svgContent={category.icon} size={32} fillColor={category.isCustomize ? category?.color : null} />}
            <Typography variant="p" text={category?.name} />
            {isEdit && (
                <Button type="transparent" onClick={click} noPadding>
                    <X size={16} color="var(--danger)"/>
                </Button>
            )}
        </div>
    );
};

export default CategoryWidget;
