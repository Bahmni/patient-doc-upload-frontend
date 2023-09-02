import React from "react";
import { Header, HeaderMenuItem } from "carbon-components-react";
import { Home24 } from "@carbon/icons-react";
import { Link } from "react-router-dom"; 
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <Header className={styles.header__container} aria-label="app-header">
      <Link to="/bahmni/home/dashboard" className={styles.header__item}>
        <Home24 className={styles.header__icon} style={{ color: 'white' }} />
      </Link>
      <h5 className={styles.header__heading}>Patient Documents</h5>
    </Header>
  );
};

export default Navbar;

