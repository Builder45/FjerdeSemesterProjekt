import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useAuth(authRequired) {
    const { data: session } = useSession();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            console.log('Session error... Signing out!!!');
            signOut({ callbackUrl: '/login', redirect: authRequired });
        }

        if (session === null) {
            console.log('Session is null!')
            if (router.route !== '/login' && authRequired) {
                router.replace('/login');
            }
            setIsAuthenticated(false);
        } else if (session !== undefined) {
            console.log('Session exists!')
            if (router.route === '/login') {
                router.replace('/');
            }
            setIsAuthenticated(true);
        }
    }, [session]);

    return isAuthenticated;
}