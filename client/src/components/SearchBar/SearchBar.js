import React, { useState, Fragment } from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

function SearchBar({ submitSearch, query }) {
  const [searchQuery, setSearchQuery] = useState(query);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery || searchQuery === "") return;
    submitSearch(searchQuery);
    // console.log(`"submitied from form": ${searchQuery}`);
  };

  return (
    <Fragment>
      <div className={styles.inputGroup} onSubmit={onSubmit}>
        {/* <div className="input-group" onSubmit={onSubmit}> */}
        <input
          type="search"
          className={`ml-5 ${styles.searchBox}`}
          placeholder={query === "" ? query : "Search Images..."}
          value={searchQuery}
          onInput={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch id="search-button" type="submit" onClick={onSubmit} />
      </div>
    </Fragment>
  );
}

export default SearchBar;
