"use client";
import LoginModal from '@/components/Modals/LoginModal';
import { User } from '@/types/user';
import React, { createContext, useEffect, useState } from 'react';

interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (email: string, password: string, remember: boolean) => void;
    logout: () => void;
    openModal: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    user: null,
    login: () => {},
    logout: () => {},
    openModal: () => {},
});

const localStorageKey = 'loggedInUser';

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<AuthContextType['token']>(null);
    const [user, setUser] = useState<AuthContextType['user']>(null);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string, remember: boolean) => {
        setError(null);
        const res = await fetch('https://distributed-project-backend.onrender.com/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        
        console.log(res)
        const data = await res.json();
        console.log(data)

        if (!res.ok) {
            setError('Login failed: ' + data.details);
            return;
        }

        sessionStorage.setItem(localStorageKey, JSON.stringify(data));
        if(remember) localStorage.setItem(localStorageKey, JSON.stringify(data));

        setLoginModalOpen(false);
        setToken(data.token);
        setUser(data.user);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem(localStorageKey);
        sessionStorage.removeItem(localStorageKey);
        window.location.reload();
    };

    useEffect(() => {
        const session = sessionStorage.getItem(localStorageKey);

        if(session){
            const parsedData = JSON.parse(session);
            setToken(parsedData.token);
            setUser(parsedData.user);
            return
        }

        const savedData = localStorage.getItem(localStorageKey);
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setToken(parsedData.token);
            setUser(parsedData.user);
        }
    }, []);

    const openModal = () => {
        setLoginModalOpen(true);
    }

    const closeModal = () => {
        setLoginModalOpen(false);
    }

    const submitLoginModal = (email: string, password: string, remember: boolean) => {
        login(email, password, remember);
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout, openModal }}>
            <>
                {children}
                <LoginModal open={loginModalOpen} onClose={closeModal} onSubmit={submitLoginModal} error={error} />
            </>
        </AuthContext.Provider>
    );
};