import { AsyncPaginate } from "react-select-async-paginate";

import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        return await fetch(`${GEO_API_URL}?namePrefix=${inputValue}`, geoApiOptions)
        .then((response) => response.json())
        .then((response) => {
            return {
                options: response.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`
                    };
                })
            };
        })
        .catch((err) => console.error(err));
    }

    const hendleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            placeholder = "Search for city"
            debounceTimeout = {600}
            value = {search}
            onChange={hendleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;