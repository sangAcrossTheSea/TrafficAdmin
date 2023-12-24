// import React, { useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

// eslint-disable-next-line react/prop-types
function SearchBar({ searchText, styleClass, placeholderText, setSearchText }) {
  const updateSearchInput = (value) => {
    setSearchText(value);
  };

  return (
    <div className={"inline-block " + styleClass}>
      <div className="input-group relative flex flex-row items-stretch w-full">
        {/* <div className="input-group-addon flex justify-center items-center px-2">
          <MagnifyingGlassIcon className="w-6 h-6" />
        </div> */}
        <input
          type="search"
          value={searchText}
          placeholder={placeholderText || "Tìm kiếm..."}
          onChange={(e) => updateSearchInput(e.target.value)}
          className="input input-md input-bordered w-full max-w-xs pr-16"
        />
      </div>
    </div>
  );
}

export default SearchBar;
