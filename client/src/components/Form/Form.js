import React, { useState } from "react";

import styles from "./Form.module.css";

const Form = ({ submitSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery || searchQuery === "") return;
    submitSearch(searchQuery);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.heading}>
        <span className={styles.light}>Colour</span> Palettes
      </h1>
      <input
        aria-label="searchQuery"
        type="text"
        className={`${styles.input} form-control`}
        placeholder="Search color palettes via keywords..."
        required
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button type="submit" className={styles.button} onClick={onSubmit}>
        Search
      </button>
    </form>
  );
};

export default Form;
