import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContent";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Board from "./pages/Board";
import Departments from "./pages/Departments";
import Profile from "./pages/Profile";

/**
 * A wrapper component that checks for authentication.
 * If authenticated, it renders the child routes (Outlet).
 * If not authenticated, it redirects to the login page.
 */
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Display a loading screen while auth state is being determined
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-xl text-gray-600">
        Loading Application...
      </div>
    );
  }

  // If authenticated, render the children (the dashboard routes)
  if (isAuthenticated) {
    return <Outlet />;
  }

  // If not authenticated, redirect to login
  return <Navigate to="/login" replace />;
};

/**
 * Main application component responsible for routing and context provision.
 */
export default function App() {
  return (
    // BrowserRouter provides the routing functionality
    <BrowserRouter>
      {/* AuthProvider manages the user's authentication state (logged in/out) */}
      <AuthProvider>
        {/* ProfileProvider fetches and manages the user's profile data, dependent on AuthState */}
        <ProfileProvider>
          <Routes>

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Redirect root to /dashboard if authenticated, or /login if not */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Protected Routes (Requires Authentication) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/board" element={<Board />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/profile" element={<Profile />} />

              {/* Future route for specific department view */}
              <Route path="/department/:id" element={<Board />} />
            </Route>

            {/* Catch-all for 404 - redirects to dashboard (or login if unauthenticated) */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />

          </Routes>
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}