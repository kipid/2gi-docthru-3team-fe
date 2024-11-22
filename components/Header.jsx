import React, {useState} from "react";
import styles from './Header.module.css';

const Header = () => {
	const [loggedIn, setLoggedIn] = useState(false);

	return (
	<nav className={styles.navbar}>
      <div className={styles.left}>
        <img src="@/public/images/img_logo.png" alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.right}>
        {!loggedIn ? (
          <button className={styles.loginButton} onClick={() => setLoggedIn(true)}>
            로그인
          </button>
        ) : (
          <>
            <img src="@/public/images/ic_bell.png" className={styles.notificationButton} />
            <img src="@/public/images/ic_profile.png" className={styles.userButton} />
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
