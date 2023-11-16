//src/api/legis-data.ts
// Importe a anotação de tipo necessária para a legisItem, se ainda não estiver importada
import { legisItem } from "@/types/legis";
import { endpoints, fetcher } from "@/utils/axios";
import { useMemo } from "react";
import useSWR from "swr";

export function useGetDate() {

    const url = endpoints.legis.getDate; // Certifique-se de que essa URL está correta

    const { data, error, isLoading } = useSWR(url, fetcher);

    const memorizeData = useMemo(() => ({
        legis: (data as legisItem[]) || [],
        legisLoading: isLoading,
        legisError: error,
        legisEmpty: !isLoading && !data,
    }),
    [data, isLoading, error]
    );

    return memorizeData;
}
