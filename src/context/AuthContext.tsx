// FILE: src/context/AuthContext.tsx

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import type { ReactNode } from "react";
import { supabase } from "../lib/supabase";

// Type for the context value
interface AuthContextType {
    session: any;
    user: any;
    loading: boolean;
}

// Default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [session, setSession] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initial session
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setUser(data.session?.user ?? null);
            setLoading(false);
        });

        // Listen to auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
            setUser(newSession?.user ?? null);
            setLoading(false);
        });

        // Cleanup subscription
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const value = { session, user, loading };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Main hook — this is the one you use everywhere in the app
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}