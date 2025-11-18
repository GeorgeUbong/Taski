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
      <h2 className="text-2xl font-semibold mb-6">Welcome Back 👋</h2>

      <div className="bg-white p-6 shadow rounded-xl max-w-xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold">
            {profile?.full_name?.[0]?.toUpperCase() ?? "U"}
          </div>

          <div>
            <p className="text-xl font-semibold">{profile?.full_name}</p>
            <p className="text-gray-600">{profile?.email}</p>
            <p className="text-blue-600 font-medium mt-1">
              {profile?.department_id
                ? profile.department_id
                : "No department set"}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Link
            to="/profile"
            className="p-3 bg-blue-600 text-white rounded-md text-center font-medium hover:bg-blue-700"
          >
            Edit Profile
          </Link>

          <Link
            to="/board"
            className="p-3 bg-gray-200 rounded-md text-center font-medium hover:bg-gray-300"
          >
            Open Board
          </Link>

          <Link
            to="/departments"
            className="p-3 bg-gray-200 rounded-md text-center font-medium hover:bg-gray-300"
          >
            Departments
          </Link>

          <Link
            to="/teams"
            className="p-3 bg-gray-200 rounded-md text-center font-medium hover:bg-gray-300"
          >
            Teams
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
