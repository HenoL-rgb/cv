import { useQuery } from "@apollo/client";
import { POSITIONS } from "../apollo/positions/positions";

export const usePositions = () => {
    const { data } = useQuery(POSITIONS);

    const positions = data?.positions.map((item: any) => {
        return { value: item.id, label: item.name }
    })

    return positions;
}