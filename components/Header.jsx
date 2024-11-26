import React, {useState} from "react";
import styles from './Header.module.css';
import { useSetUser, useUser } from "@/context/UserProvider.jsx";
import { useRouter } from 'next/router';
import Image from "next/image";
import Link from "next/link";
import { useViewport } from "@/context/ViewportProvider.jsx";
import { GRADE } from "@/apis/translate.js";

const Header = () => {
  const viewport = useViewport();
  const user = useUser();
  const isAdmin = user?.role === "Admin";
  const setUser = useSetUser();
  const router = useRouter();
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [isUserDDOpen, setIsUserDDOpen] = useState(false);
  const currentPath = router.pathname;

	return (
	<nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/"><Image width={120} height={27} src="/images/img_logo.png" alt="Logo" className={styles.logo} priority /></Link>
        {user?.role === "Admin" && (
          <div className={styles.adminNav}>
            <Link href="/admin/manage"><p className={`${styles.manageButton} ${currentPath === '/admin/manage' ? styles.active : ''}`}>챌린지 관리</p></Link>
            <Link href="/" ><p className={`${styles.listButton} ${currentPath === '/' ? styles.active : ''}`}>챌린지 목록</p></Link>
          </div>
        )}
      </div>
      <div className={styles.right}>
        {!user ? (
          <button className={styles.loginButton} onClick={() => router.push("/login")}>
            로그인
          </button>
        ) : (
          <>
            <div className={styles.notiContainer}>
              <Image width={24} height={24} src="/images/ic_bell.png" alt="noti" className={styles.notificationButton} onClick={() => setIsNotiOpen(prev => !prev)} />
              {isNotiOpen && <div className={styles.notiDropDown}>
                <h3>알림</h3>
                {/* TODO: notifications.map... */}
              </div>}
            </div>
            <div className={styles.userContainer}>
                <Image width={32} height={32} src="/images/ic_profile.png" className={styles.userButton} alt="Profile" onClick={() => setIsUserDDOpen(prev => !prev)} />
              {isUserDDOpen && <div className={styles.userDropDown}>
                <div className={styles.user}>
                  <Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_profile.png" alt="Profile" />
                  <div className={styles.nicknameAndGrade}>
                    <span className={styles.nickname}>{user?.nickname}</span>
                    <span className={styles.grade}>{GRADE[user?.grade]}</span>
                  </div>
                </div>
                  {isAdmin ? <Link href="/admin/manage"><div className={styles.userDropDownItem}>챌린지 관리하기</div></Link>
                : <Link href="/users/me/challenges/ongoing"><div className={styles.userDropDownItem}>나의 챌린지</div></Link>}
                <button className={styles.userDropDownItem} onClick={() => {
                  setUser(null);
                  localStorage.removeItem("user");
                }}>로그아웃</button>
              </div>}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
