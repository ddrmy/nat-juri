import { legisItem } from "@/types/legis";
import { endpoints, fetcher } from "@/utils/axios";
import { useMemo } from "react";
import useSWR from "swr";

export function useGetLegisAll(){

    const url = endpoints.legis.getAll;

    const {data, error, isLoading} = useSWR(url, fetcher);

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