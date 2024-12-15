import { IOption } from "@/components/ui/SelectField/SelectField";

export const getListOfTypes = <T extends Record<string, string>>(typeList: T): IOption[] => {
    return Object.keys(typeList).map((key) => ({
        value: key,
        label: typeList[key],
    }));
};