import React from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

function SearchBar({ placeholder, ...props }) {
    return (
        <div className={"search"}>
            <input type="text" className={"search-input"} placeholder={placeholder} />
            <FaSearch/>
        </div>
    );
}

SearchBar.defaultProps = {
    placeholder: "",
}

export default SearchBar;

