import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useProfile } from "../hooks/useProfile";
import { supabase } from "../lib/supabase";
import toast, { Toaster } from "react-hot-toast";

// Mock data, consistent with Login and Departments pages
const allDepartments = [
    "Electronics",
    "Software",
    "3D Printing",
    "Simulation",
    "Product Design",
    "Research",
];

export default function Profile() {
    // Get global state and refresh function
    const { profile, loading, refreshProfile } = useProfile();

    // Local state for form inputs
    const [fullName, setFullName] = useState("");
    const [department, setDepartment] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    // Initialize form fields when profile data loads
    useEffect(() => {
        if (profile) {
            setFullName(profile.full_name || "");
            setDepartment(profile.department_id || "");
        }
    }, [profile]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!profile || isUpdating) return;

        if (!fullName || !department) {
            toast.error("Name and Department are required.");
            return;
        }

        setIsUpdating(true);

        const { error } = await supabase
            .from("profiles")
            .update({
                full_name: fullName,
                department_id: department,
            })
            .eq("id", profile.id); // Update only the current user's row

        if (error) {
            console.error("Profile update error:", error);
            toast.error("Update failed: " + error.message);
        } else {
            // CRITICAL: Refresh the global context state after successful update
            await refreshProfile();
            toast.success("Profile updated successfully!");
        }

        setIsUpdating(false);
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="text-gray-600 text-lg">Loading profile data...</div>
            </DashboardLayout>
        );
    }

    // Use profile?.email for display, assuming it's available from the user object
    const userEmail = profile?.email || "N/A";

    return (
        <DashboardLayout>
            <Toaster position="top-center" />
            <div className="max-w-2xl">
                <h1 className="text-3xl font-bold mb-2 text-gray-900">My Profile</h1>
                <p className="text-gray-600 mb-6">Manage your account settings and preferences</p>

                <div className="bg-white p-6 lg:p-8 shadow-sm border border-gray-200 rounded-lg">
                {/* Avatar/Header Section */}
                <div className="flex flex-col items-center mb-6">
                    {/* Avatar Placeholder (Blue circle with initials) */}
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-extrabold mb-3 shadow-lg">
                        {profile?.full_name?.[0]?.toUpperCase() ?? "U"}
                    </div>

                    <button className="text-sm text-blue-600 hover:text-blue-800 transition">
                        Change Avatar (Coming Soon)
                    </button>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            placeholder="Your full name"
                        />
                    </div>

                    {/* Email (Read-only) */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address (Read Only)
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="mt-1 w-full p-3 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed"
                            value={userEmail}
                            readOnly
                        />
                        <p className="mt-2 text-xs text-gray-500">
                            To change your email, you must perform the change directly through Supabase or contact support.
                        </p>
                    </div>

                    {/* Department */}
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                        </label>
                        <select
                            id="department"
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select your primary department</option>
                            {allDepartments.map((d) => (
                                <option value={d} key={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className={`w-full py-3 mt-4 rounded-lg text-white font-semibold shadow-md transition duration-150 
              ${isUpdating
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                            }`}
                    >
                        {isUpdating ? "Saving Changes..." : "Save Profile"}
                    </button>
                </form>
                </div>
            </div>
        </DashboardLayout>
    );
}