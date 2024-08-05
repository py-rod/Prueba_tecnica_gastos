import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('access'));



    const login = (accessToken, refreshToken) => {
        localStorage.setItem('access', accessToken);
        localStorage.setItem('refresh', refreshToken)
        setAuthToken(accessToken);
    };

    const logout = async () => {
        const refreshToken = localStorage.getItem('refresh')
        if (refreshToken) {
            try {
                await axiosInstance.post('account/logout', {
                    refresh: refreshToken
                }, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                setAuthToken(null)
            } catch (error) {
                console.error('error during logout', error)
            }
        } else {
            localStorage.removeItem('access', accessToken);
            localStorage.removeItem('refresh', refreshToken);
            setAuthToken(null);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('access');
        if (token) {
            setAuthToken(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;