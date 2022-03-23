import { useEffect, useState } from "react";
import { useQuery } from "react-query";

function useDropdownData(queryKey, listApi) {
    let { data, isSuccess } = useQuery(queryKey, listApi);

    const [dropdownData, setDropdownData] = useState([]);

    useEffect(() => {
        if (isSuccess && data) setDropdownData(data);
    }, [isSuccess, data]);

    return [dropdownData, isSuccess];
}

export default useDropdownData;
