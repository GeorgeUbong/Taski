import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  BuildingOffice2Icon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import NotificationPanel from "../components/notifications/NotificationPanel";

interface DashboardLayoutProps {
  children: ReactNode;
}

// Sidebar Navigation Items
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Project Board", href: "/board", icon: ClipboardDocumentListIcon },
  { name: "Departments", href: "/departments", icon: BuildingOffice2Icon },
];

/**
 * Main application layout featuring a sidebar and topbar.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { signout } = useAuth();
  const { profile } = useProfile();
  const location = useLocation();

  // State for dropdown visibility
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Ref for click-outside detection
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Mock notifications count for the badge
  const unreadNotificationCount = 3;

  // Handler to close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Helper to toggle notification panel and ensure only one menu is open
  const toggleNotifications = () => {
    setIsNotificationsOpen(prev => !prev);
    if (isProfileMenuOpen) {
      setIsProfileMenuOpen(false);
    }
  };

  // Helper to toggle profile menu and ensure only one menu is open
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(prev => !prev);
    if (isNotificationsOpen) {
      setIsNotificationsOpen(false);
    }
  };

  const currentPath = location.pathname;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">

      {/* 1. Static Sidebar */}
      <div className="w-64 flex-shrink-0 bg-white shadow-xl flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-black text-blue-600">RESEARCH-HUB</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center p-3 rounded-xl transition duration-150 
                ${currentPath === item.href
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-200"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                }`}
            >
              <item.icon className="w-6 h-6 mr-3" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">Logged in as:</p>
          <p className="text-sm font-medium text-gray-700 truncate">
            {profile?.email || 'user@example.com'}
          </p>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Topbar */}
        <header className="flex-shrink-0 bg-white shadow-md">
          <div className="flex justify-between items-center h-16 px-8">
            <h2 className="text-xl font-bold text-gray-800">
              {navigation.find(n => n.href === currentPath)?.name || "Welcome"}
            </h2>

            <div className="flex items-center space-x-4">

              {/* Notification Bell Icon & Dropdown */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={toggleNotifications}
                  className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-100 transition duration-150 relative"
                  aria-label="Show notifications"
                >
                  <BellIcon className="w-6 h-6" />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute top-1 right-1 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500">
                    </span>
                  )}
                </button>

                {isNotificationsOpen && (
                  <NotificationPanel onClose={() => setIsNotificationsOpen(false)} />
                )}
              </div>

              {/* Profile Menu Icon & Dropdown */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center p-1 rounded-full text-gray-600 hover:ring-2 hover:ring-blue-500 transition duration-150"
                  aria-label="Open user menu"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-sm text-gray-700">
                    {profile?.full_name?.[0]?.toUpperCase() ?? "U"}
                  </div>
                </button>

                {isProfileMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50 transform origin-top-right animate-in fade-in slide-in-from-top-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <div className="p-3 border-b">
                      <p className="text-sm font-semibold text-gray-800 truncate">{profile?.full_name || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{profile?.department_id || 'Department'}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-100"
                        role="menuitem"
                      >
                        <UserCircleIcon className="w-5 h-5 mr-3" />
                        Your Profile
                      </Link>
                      <button
                        onClick={signout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition duration-100"
                        role="menuitem"
                      >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}