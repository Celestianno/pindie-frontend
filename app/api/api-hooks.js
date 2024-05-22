import { useState, useEffect } from "react";
import { getNormalizedGameDataByCategory, isResponseOk } from "./api-utils";

export const useGetDataByCategory = (endpoint, category) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getNormalizedGameDataByCategory(endpoint, category);
            isResponseOk(data) && setData(data);
        }

        fetchData();
    }, []);

    return data;
}