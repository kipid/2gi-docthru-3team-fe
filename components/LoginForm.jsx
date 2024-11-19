import styles from './LoginForm.module.css';
import Image from 'next/image';
import Link from 'next/link';

function LoginForm() {
  const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

  return (
    <div className={styles.form}>
      <form
        className={styles.LoginForm}
        onSubmit={e => {
          e.preventDefault();
          login();
        }}
      >
        <label htmlFor="email">
          <p>이메일</p>
          <div className={styles.email}>
            <input id="email" name="email" type="email" placeholder="이메일을 입력해주세요" className={styles.inputNormal} />
          </div>
        </label>
        <label htmlFor="password">
          비밀번호
          <div className={styles.password}>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              className={styles.inputNormal}
            />
            <Image
              width={24}
              height={24}
              className={styles.pwToggle}
              src="/images/btn_visibility_off_24px.png"
              alt="비밀번호표시"
              priority
            />
          </div>
        </label>
        <button type="submit" className={styles.loginButton}>
          로그인
        </button>
        <div className={styles.signupLink}>
          회원이 아니신가요?
          <Link href="/signup" style={{ color: '#262626', style: 'solid' }}>
            회원가입하기
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
