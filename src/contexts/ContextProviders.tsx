import { ReactNode } from "react";
import AuthContextProvider from "./AuthContext";
import { CartButtonProvider } from "./CartButtonContext";

export default function ContextProviders({ children }: { children: ReactNode }) {
    return (
        <AuthContextProvider>
            <CartButtonProvider>
                {children}
            </CartButtonProvider>
        </AuthContextProvider>
    )
}