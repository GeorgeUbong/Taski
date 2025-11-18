// FILE: src/context/ProfileContext.tsx
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import type { ReactNode } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";

interface Profile {
    id: string;
    full_name: string;
    email: string;
    department_id: string | null;
    avatar: string | null;
}

interface ProfileContextType {
    profile: Profile | null;
    loading: boolean;
    refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType>({
    profile: null,
    loading: true,
    refreshProfile: async () => { },
});

export function ProfileProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    const loadProfile = async () => {
        if (!user) {
            setProfile(null);
            setLoading(false);
            return;
        }

        let { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (!error && data) {
            setProfile(data);
        }

        setLoading(false);
    };

    // Load profile whenever user changes
    useEffect(() => {
        loadProfile();
    }, [user]);

    return (
        <ProfileContext.Provider
            value={{
                profile,
                loading,
                refreshProfile: loadProfile,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfileContext() {
    return useContext(ProfileContext);
}
