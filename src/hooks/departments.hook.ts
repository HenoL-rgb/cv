import { useQuery } from "@apollo/client";
import { DEPARTMENTS } from "../apollo/departments/departments";

export const useDepartments = () => {
    const { data } = useQuery(DEPARTMENTS);

    const departments = data?.departments.map((item: any) => {
        return { value: item.id, label: item.name }
    })

    return departments;
}