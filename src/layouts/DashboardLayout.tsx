import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  BuildingOffice2Icon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  BellIcon,
  Cog6ToothIcon,
  PlusIcon,
  ArrowPathIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import NotificationPanel from "../components/notifications/NotificationsPanel";

interface DashboardLayoutProps {
  children: ReactNode;
}

// Sidebar Navigation Items
const navigation = [
  { name: "Board", href: "/board", icon: ClipboardDocumentListIcon },
  { name: "Projects", href: "/dashboard", icon: HomeIcon },
  { name: "Departments", href: "/departments", icon: BuildingOffice2Icon },
  { name: "Teams", href: "/teams", icon: BuildingOffice2Icon },
  { name: "Completed", href: "/completed", icon: ArrowPathIcon },
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 1. Sidebar - Always visible on desktop, toggleable on mobile */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex-col transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Taski</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-lg transition duration-150 
                ${currentPath === item.href || (item.href === "/board" && currentPath.startsWith("/board"))
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* 2. Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0 w-full lg:w-auto">

        {/* Topbar */}
        <header className="shrink-0 bg-white border-b border-gray-200">
          <div className="flex justify-between items-center h-16 px-4 lg:px-6">
            {/* Left: Mobile menu button, Logo and Create Button */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                aria-label="Open sidebar"
              >
                <Bars3Icon className="w-6 h-6 text-gray-600" />
              </button>
              <div className="lg:hidden">
                <h1 className="text-lg font-bold text-gray-900">Taski</h1>
              </div>
              <button className="hidden sm:flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 text-sm font-medium">
                <PlusIcon className="w-4 h-4 mr-2" />
                Create
              </button>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center space-x-3 lg:space-x-4">

              {/* Settings Icon */}
              <button
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition duration-150"
                aria-label="Settings"
              >
                <Cog6ToothIcon className="w-5 h-5" />
              </button>

              {/* Notification Bell Icon & Dropdown */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={toggleNotifications}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition duration-150 relative"
                  aria-label="Show notifications"
                >
                  <BellIcon className="w-5 h-5" />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500">
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
                  className="flex items-center p-1 rounded-full hover:ring-2 hover:ring-gray-200 transition duration-150"
                  aria-label="Open user menu"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-semibold text-sm text-white">
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
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 xl:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}