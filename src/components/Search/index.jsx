import React from "react";
import { usePictureContext } from "../../context/pictureContext";
import "./Search.css";

const Search = () => {
  const { setSearch } = usePictureContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value.trim().toLowerCase();
    if (searchTerm === "") {
      setSearch();
    } else {
      setSearch(searchTerm);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="searchbox shadow"
          type="search"
          placeholder="Search for a title or tag..."
          onChange={(e) => handleSubmit(e)}
        />
      </form>
    </div>
  );
};

export default Search;
