import React, { useState } from "react";

import Button from "../../UI/Button/Button";
import styles from "./Navegation.module.css";
const Navegation = (props) => {
  const [logOutState, setLogOutState] = useState(false);

  const logOutHandler = () => {
    setLogOutState(true);
    props.onLogOut(logOutState);
  };

  return (
    <nav className={styles.nav}>
      <ul>
        {props.logInState && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {props.logInState && (
          <li>
            <a href="/">User</a>
          </li>
        )}
        {props.logInState && (
          <li>
            <Button className={styles.btn} onClick={logOutHandler}>
              Log out
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navegation;
