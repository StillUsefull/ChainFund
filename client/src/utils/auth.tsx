import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; 
import api from './api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try {
            const response = await api.get('/user/iam', {
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`
                }
            })
            setUser({
                id: response.data.id,
                role: response.data.role
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            localStorage.removeItem('accessToken');
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    const clearUser = () => {
        setUser(null);  
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsLoggedIn(true);
            fetchUser();
        }
    }, []);

    

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, setIsLoggedIn, fetchUser, clearUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);