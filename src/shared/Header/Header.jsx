import { NavLink } from 'react-router';
import styles from './Header.module.css';

export const Header = (props) => {
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
