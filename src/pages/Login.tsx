// FILE: src/pages/Login.tsx
import { useState } from "react";
import { supabase } from "../lib/supabase";
import toast, { Toaster } from "react-hot-toast";

const departments = [
  "Electronics",
  "Software",
  "3D Printing",
  "Simulation",
  "Product Design",
  "Research",
];

export default function Login() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!email || !fullName || !department) {
      toast.error("Please fill all fields.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        data: {
          full_name: fullName,
          department_id: department, // store department metadata
        },
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) toast.error(error.message);
    else toast.success("Magic link sent! Check your email.");

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Toaster position="top-center" />

      <div className="w-full max-w-md bg-white shadow-md p-8 rounded-xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Taski — Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="mt-1 w-full p-2 border rounded-md"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full p-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium">Department</label>
            <select
              className="mt-1 w-full p-2 border rounded-md"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select department</option>
              {departments.map((d) => (
                <option value={d} key={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-semibold transition 
              ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Sending..." : "Send Magic Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
