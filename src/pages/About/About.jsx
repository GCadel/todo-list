import styles from './About.module.css';
export const About = () => {
  return (
    <main className={styles.card}>
      <h2>About</h2>
      <section>
        <h3>What is this?</h3>
        <p>
          This is a todo list application. It allows you to create a list of
          tasks for you to track for completion. This app is created with React
          and Vite, and uses AirTable to store your tasks.
        </p>
      </section>

      <section>
        <h3>Credits</h3>
        <p>
          Created by George Cadel-Munoz. Check out some other projects 👉{' '}
          <a href="https://gcmunoz.com/" target="_blank" rel="noreferrer">
            Here
          </a>{' '}
          👈
        </p>
      </section>
    </main>
  );
};
