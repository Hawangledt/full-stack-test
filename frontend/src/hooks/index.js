import { createContext, useState, useContext, useEffect } from "react";
import { api } from "../services/api"

const AppContext = createContext();


function UserProvider({ children }) {

    const [accessToken, setAccessToken] = useState("")
    const [user, setUser] = useState({})

    useEffect(() => {
        const load = async () => {
            const token = localStorage.getItem("accessToken")
            if (token) {
                const decodedToken = JSON.parse(atob(token.split('.')[1]))
                setUser(decodedToken)
                setAccessToken(token)
            }
        }
        load()
    }, [])

    function logout() {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user")
        setAccessToken(null)
        setUser({})
    }

    if (accessToken !== "") {
        api.defaults.headers.Authorization = `${accessToken}`
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("user", JSON.stringify(user))
    }

    const [count, setCount] = useState(1);
    return (
        <AppContext.Provider value={{ count, setCount, token: accessToken, setAccessToken, logout, user }}>
            {children}
        </AppContext.Provider>
    )
}


function useApp() {
    const context = useContext(AppContext);


    if (!context) {
        throw new Error("The App must be used within a UserProvider")
    }

    return context;
}


export { UserProvider, useApp }