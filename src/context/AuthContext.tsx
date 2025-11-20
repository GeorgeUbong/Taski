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
    isAuthenticated: boolean;
    isLoading: boolean;
    signout: () => Promise<void>;
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
        // Handle auth callback from magic link
        const handleAuthCallback = async () => {
            const { data: { session: callbackSession } } = await supabase.auth.getSession();
            
            // Check if we have hash parameters (from magic link redirect)
            const hashParams = new URLSearchParams(window.location.hash.substring(1));
            if (hashParams.get('access_token') || hashParams.get('type') === 'recovery') {
                // Clear the hash from URL
                window.history.replaceState(null, '', window.location.pathname);
                
                // Get the session after processing the hash
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    setSession(session);
                    setUser(session.user);
                    setLoading(false);
                    return;
                }
            }
            
            // Initial session check
            if (callbackSession) {
                setSession(callbackSession);
                setUser(callbackSession.user);
            }
            setLoading(false);
        };

        handleAuthCallback();

        // Listen to auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, newSession) => {
            setSession(newSession);
            setUser(newSession?.user ?? null);
            setLoading(false);

            // Handle profile creation on first sign in
            if (event === 'SIGNED_IN' && newSession?.user) {
                // Check if profile exists, if not create it
                const { data: existingProfile } = await supabase
                    .from('profiles')
                    .select('id')
                    .eq('id', newSession.user.id)
                    .single();

                if (!existingProfile) {
                    // Create profile with metadata from user
                    const userMetadata = newSession.user.user_metadata || {};
                    const { error: profileError } = await supabase
                        .from('profiles')
                        .insert({
                            id: newSession.user.id,
                            email: newSession.user.email,
                            full_name: userMetadata.full_name || newSession.user.email?.split('@')[0] || 'User',
                            department_id: userMetadata.department_id || null,
                        });

                    if (profileError) {
                        console.error('Error creating profile:', profileError);
                    }
                }
            }
        });

        // Cleanup subscription
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const signout = async () => {
        await supabase.auth.signOut();
    };

    const value = { 
        session, 
        user, 
        loading, 
        isLoading: loading,
        isAuthenticated: !!session,
        signout 
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Export the context hook for use in other hooks
export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}

// Main hook — this is the one you use everywhere in the app
export function useAuth() {
    return useAuthContext();
}