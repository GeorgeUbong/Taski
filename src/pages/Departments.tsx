import { Link } from "react-router-dom";
import { LockClosedIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import DashboardLayout from "../layouts/DashboardLayout";
import { useProfile } from "../hooks/useProfile";

// Mock data, eventually replaced by fetching from a 'departments' table
const allDepartments = [
    "Electronics",
    "Software",
    "3D Printing",
    "Simulation",
    "Product Design",
    "Research",
];

export default function Departments() {
    const { profile, loading } = useProfile();

    if (loading) {
        return (
            <DashboardLayout>
                <div className="text-gray-600 text-lg">Loading departments...</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Departments</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allDepartments.map((deptName) => {
                    const isUserDepartment = deptName === profile?.department_id;

                    return (
                        <div
                            key={deptName}
                            className={`bg-white p-6 rounded-xl shadow-lg transition duration-200 
                ${isUserDepartment ? "border-l-4 border-green-500 hover:shadow-xl" : "border-l-4 border-gray-200 hover:shadow-md"}`}
                        >
                            <h3 className="text-xl font-semibold mb-3">{deptName}</h3>

                            <p className="text-sm text-gray-500 mb-4">
                                {isUserDepartment
                                    ? "This is your current department. You have full edit access to tasks and settings."
                                    : "View-only access. You can see tasks but cannot make modifications."}
                            </p>

                            <div className="flex items-center justify-between mt-4">
                                {isUserDepartment ? (
                                    <span className="flex items-center text-green-600 font-medium">
                                        <CheckCircleIcon className="w-5 h-5 mr-1" />
                                        Full Access
                                    </span>
                                ) : (
                                    <span className="flex items-center text-gray-500 font-medium">
                                        <LockClosedIcon className="w-5 h-5 mr-1" />
                                        View Only
                                    </span>
                                )}

                                {/* Link to Department View Page (to be implemented later) */}
                                <Link
                                    to={`/department/${deptName.toLowerCase().replace(/\s/g, '-')}`}
                                    className="text-blue-600 hover:text-blue-800 font-medium transition duration-150"
                                >
                                    View Board →
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </DashboardLayout>
    );
}