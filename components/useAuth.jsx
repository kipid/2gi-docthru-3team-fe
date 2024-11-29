import { useRouter } from 'next/router';
import { useUser } from '@/context/UserProvider';
import { useEffect, useState } from 'react';

export default function useAuth(required ) {
    const allowedUser = useUser();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState(null);
    
    useEffect(() => {
        if (!allowedUser) {
            setErrorMessage({ message: "권한이 필요합니다.", onCancel: () => router.push('/login')});
            // router.push('/login');
        }

        else if (required && allowedUser.role !== required) {
            setErrorMessage({ message: "권한이 없습니다.", onCancel: () => router.push('/')});
            // router.push('/');
        }

        else setErrorMessage(null);

    }, [allowedUser, router, required]);

    return { allowedUser, errorMessage, setErrorMessage };
}