import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, createContext } from "react";

export const UserContext = createContext()

function MyApp({ Component, pageProps }) {
    const [username, setUsername] = useState("Luigi");

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            <Component {...pageProps} />
        </UserContext.Provider>
    )
}

export default MyApp
