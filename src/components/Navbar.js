import React from "react";
import { Header, HeaderMenuItem } from "carbon-components-react";
import { Home24 } from "@carbon/icons-react";
import styles from "./Navbar.module.scss";
const Navbar = () => {
  return (
    <Header className={styles.header__container} aria-label="app-header">
      <HeaderMenuItem className={styles.header__item} href="#">
      <Home24 />
      </HeaderMenuItem>
      <h5 className={styles.header__heading}>Patient Documents</h5>
    </Header>
  );
};
export default Navbar;
