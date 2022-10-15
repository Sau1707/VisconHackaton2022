import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import {
    SessionProvider,
    signIn,
    useSession,
} from "next-auth/react";


function MyApp({ Component, session, pageProps }) {
    return (
        <SessionProvider session={session}>
            {Component.public ? (
                <Component {...pageProps} />) : (
                <Auth>
                    <Component {...pageProps} />
                </Auth>
            )}
        </SessionProvider>
    )
}


const Auth = ({ children }) => {
    const { data: session, status } = useSession()

    const isUser = session?.user !== undefined;
    useEffect(() => {
        if (status === "loading") return;
        if (!isUser) signIn();
    }, [isUser, status]);

    if (isUser) {
        return <>{children}</>;
    }

    return <div>Loading...</div>;
};


export default MyApp
