import React, { createContext, useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

// TODO: get the BACKEND_URL.
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
console.log(VITE_BACKEND_URL);

/*
 * This provider should export a `user` context state that is 
 * set (to non-null) when:
 *     1. a hard reload happens while a user is logged in.
 *     2. the user just logged in.
 * `user` should be set to null when:
 *     1. a hard reload happens when no users are logged in.
 *     2. the user just logged out.
 */
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // TODO: Modify me.

    const fetchUser = async () => {
        let token = localStorage.getItem("token");

        if (!token || token === 'undefined') {
            console.log("no token");
            setUser(null);
            return;
        }

        let res = await fetch(VITE_BACKEND_URL + "/user/me", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();

        if (data["user"] === undefined) {
            setUser(null);
        } else {
            setUser(data["user"]);
        }
    }

    useEffect(() => {
        // TODO: complete me, by retriving token from localStorage and make an api call to GET /user/me.
        fetchUser();
    }, [])

    /*
     * Logout the currently authenticated user.
     *
     * @remarks This function will always navigate to "/".
     */
    const logout = () => {
        // TODO: complete me
        localStorage.removeItem("token");
        navigate("/");
    };

    /**
     * Login a user with their credentials.
     *
     * @remarks Upon success, navigates to "/profile". 
     * @param {string} username - The username of the user.
     * @param {string} password - The password of the user.
     * @returns {string} - Upon failure, Returns an error message.
     */
    const login = async (username, password) => {
        // TODO: complete me
        let res = await fetch(VITE_BACKEND_URL + '/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password }),
        });

        const data = await res.json();

        if (res.status !== 200) {
            return data["message"];
        }

        localStorage.setItem('token', data["token"]);
        await fetchUser();
        navigate("/profile");

        return "";
    };

    /**
     * Registers a new user. 
     * 
     * @remarks Upon success, navigates to "/".
     * @param {Object} userData - The data of the user to register.
     * @returns {string} - Upon failure, returns an error message.
     */
    const register = async (userData) => {
        // TODO: complete me
        console.log(userData);
        let res = await fetch(VITE_BACKEND_URL + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await res.json();

        if (res.status === 201) {
            navigate("/success");
            return ''
        }
        return data["message"];
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
