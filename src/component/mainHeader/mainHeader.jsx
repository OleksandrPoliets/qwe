import React from 'react';
import logo from '../../img/logo.png';
import styles from './styles.module.scss';

export const MainHeader = () => (
   <header className={styles.header}>
       <img src={logo} className={styles.mainLogo} alt="main logo"/>
       <h1 className={styles.headerTitle}>Bazila</h1>
   </header>
);

export default MainHeader;
