// FILE: src/components/navigation/Topbar.tsx
import { supabase } from "../../lib/supabase";
import { BellIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";

export default function Topbar() {
    const { user } = useAuth();

    const logout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <header className="bg-white border-b p-4 flex justify-between items-center">
            <div />

            <div className="flex items-center space-x-6">
                {/* NotificationBell */}
                <button className="relative">
                    <BellIcon className="w-6 h-6 text-gray-700" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full" />
                </button>

                {/* Avatar */}
                <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                    {user?.email?.[0]?.toUpperCase() || "U"}
                </div>

                {/* Logout */}
                <button
                    onClick={logout}
                    className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}
