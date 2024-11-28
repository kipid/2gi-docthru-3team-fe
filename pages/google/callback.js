import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSetUser } from '@/context/UserProvider';

export default function GoogleCallback() {
  const router = useRouter();
  const setUser = useSetUser();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      // URL에서 쿼리 파라미터 추출
      const query = new URLSearchParams(window.location.search);
      console.log(query.toString());
      const accessToken = query.get('accessToken');
      const refreshToken = query.get('refreshToken');
      const user = query.get('user');

      if (accessToken && refreshToken && user) {
        // 로컬 스토리지에 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', user);

        // 사용자 정보 업데이트
        setUser(JSON.parse(user));

        // 권한에 따라 페이지 이동
        const parsedUser = JSON.parse(user);
        if (parsedUser.role === 'Admin') {
          router.push('/admin/manage');
        } else {
          router.push('/');
        }
      } else {
        console.error('구글 로그인 실패: 데이터가 없습니다.');
        router.push('/login'); // 로그인 페이지로 리다이렉트
      }
    };

    handleGoogleLogin();
  }, [router, setUser]);

  return <p>구글 로그인 처리 중...</p>;
}
