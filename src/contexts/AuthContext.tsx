"use client";
import { User } from '@/types/user';
import React, { createContext, useEffect, useState } from 'react';

interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    user: null,
    login: () => {},
    logout: () => {},
});

const localStorageKey = 'loggedInUser';

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<AuthContextType['token']>(null);
    const [user, setUser] = useState<AuthContextType['user']>(null);

    const login = async (email: string, password: string) => {
        const res = await fetch('https://distributed-project-backend.onrender.com/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            return console.log('Login failed: ', data.detail);
        }

        localStorage.setItem(localStorageKey, data);

        setToken(data.token);
        setUser(data.user);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem(localStorageKey);
    };

    useEffect(() => {
        const savedData = localStorage.getItem(localStorageKey);

        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setToken(parsedData.token);
            setUser(parsedData.user);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};