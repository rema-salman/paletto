import React from "react";

import styles from "./Error.module.css";
import { FaRegTimesCircle } from "react-icons/fa";

const Error = ({ message }) => {
  return (
    <div className={`${styles.error} alert position-absolute`} role="alert">
      <h1>{message}</h1>
    </div>
  );
};

export default Error;
