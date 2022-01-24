import React from "react";
import SearchBar from "../SearchBar";

import styles from "./Header.module.css";

const Header = ({ submitSearch, query }) => (
  <div className="p-5 d-flex justify-content-between align-items-center flex-wrap">
    <h1 className={styles.heading}>
      <span className={styles.light}>Colour</span> Palettes
    </h1>
    <SearchBar submitSearch={submitSearch} query={query} />
  </div>
);

export default Header;
