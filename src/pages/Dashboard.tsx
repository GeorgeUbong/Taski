// FILE: src/pages/Dashboard.tsx
import DashboardLayout from "../layouts/DashboardLayout";
import { useProfile } from "../hooks/useProfile";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-gray-600 text-lg">Loading profile...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back 👋</h1>
        <p className="text-gray-600 mb-6">Here's what's happening with your projects today.</p>

        <div className="bg-white p-6 lg:p-8 shadow-sm border border-gray-200 rounded-lg">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
              {profile?.full_name?.[0]?.toUpperCase() ?? "U"}
            </div>

            <div>
              <p className="text-xl font-semibold text-gray-900">{profile?.full_name}</p>
              <p className="text-gray-600 text-sm">{profile?.email}</p>
              <p className="text-blue-600 font-medium mt-1 text-sm">
                {profile?.department_id
                  ? profile.department_id
                  : "No department set"}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to="/profile"
            className="p-3 bg-blue-600 text-white rounded-lg text-center font-medium hover:bg-blue-700 transition duration-150"
          >
            Edit Profile
          </Link>

          <Link
            to="/board"
            className="p-3 bg-gray-100 text-gray-700 rounded-lg text-center font-medium hover:bg-gray-200 transition duration-150"
          >
            Open Board
          </Link>

          <Link
            to="/departments"
            className="p-3 bg-gray-100 text-gray-700 rounded-lg text-center font-medium hover:bg-gray-200 transition duration-150"
          >
            Departments
          </Link>

          <Link
            to="/teams"
            className="p-3 bg-gray-100 text-gray-700 rounded-lg text-center font-medium hover:bg-gray-200 transition duration-150"
          >
            Teams
          </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
