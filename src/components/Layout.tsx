import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : '')}
              end
            >
              Изучение
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Добавить слово
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/stats"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Статистика
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
