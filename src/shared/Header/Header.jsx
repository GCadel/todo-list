import { NavLink, useLocation } from 'react-router';
import styles from './Header.module.css';
import { useEffect } from 'react';

export const Header = (props) => {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        document.title = 'Todo List';
        return;
      case '/about':
        document.title = 'About';
        return;
      default:
        document.title = 'Not Found';
        return;
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>
        {props.title ? props.title : 'Hello World!'}
      </h1>
      <nav>
        <NavLink
          className={({ isActive }) => {
            return isActive ? styles.active : styles.inactive;
          }}
          to={`/`}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? styles.active : styles.inactive;
          }}
          to={`/about`}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
};
