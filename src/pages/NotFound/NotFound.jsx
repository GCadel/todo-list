import { Link } from 'react-router';
import styles from './NotFound.module.css';
export const NotFound = () => {
  return (
    <main className={styles.card}>
      <section>
        <h3>
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </h3>
        <p className={styles.strong}>NOT FOUND</p>

        <br />
        <br />
        <p>{`Maybe we should go home...`}</p>
        <Link className={styles.button} to={'/'}>
          Home
        </Link>
      </section>
    </main>
  );
};
