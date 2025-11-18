import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// Mock notification data
const mockNotifications = [
    {
        id: 1,
        type: 'task_assigned',
        message: 'Task "Implement AuthContext" assigned to you by Jane Doe.',
        time: '2 minutes ago',
        read: false,
        link: '/board',
    },
    {
        id: 2,
        type: 'profile_update',
        message: 'Your profile details were successfully updated.',
        time: '3 hours ago',
        read: true,
        link: '/profile',
    },
    {
        id: 3,
        type: 'project_alert',
        message: 'Project "Agricultural Drone" is due in 3 days.',
        time: '1 day ago',
        read: false,
        link: '/dashboard',
    },
    {
        id: 4,
        type: 'department_change',
        message: 'New RLS policies deployed to the "Software" department.',
        time: '2 days ago',
        read: true,
        link: '/departments',
    },
];

interface NotificationPanelProps {
    onClose: () => void;
}

/**
 * Dropdown component to display recent user notifications.
 */
export default function NotificationPanel({ onClose }: NotificationPanelProps) {
    const unreadCount = mockNotifications.filter(n => !n.read).length;

    return (
        <div
            className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 z-50 transform origin-top-right animate-in fade-in slide-in-from-top-1"
            // Use static height and overflow-y-auto for scrollability
            style={{ maxHeight: '400px' }}
            aria-label="Notifications Panel"
        >
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                    Notifications
                </h3>
                <span className="text-sm font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    {unreadCount} Unread
                </span>
            </div>

            <ul className="divide-y divide-gray-100 overflow-y-auto">
                {mockNotifications.map((notification) => (
                    <li key={notification.id}>
                        <Link
                            to={notification.link}
                            onClick={onClose} // Close panel when a notification is clicked
                            className={`flex justify-between items-start p-4 hover:bg-gray-50 transition duration-150 ${!notification.read ? 'bg-blue-50/70' : 'bg-white'}`}
                        >
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                                    {notification.message}
                                </p>
                                <p className="mt-1 text-xs text-gray-400">
                                    {notification.time}
                                </p>
                            </div>

                            {!notification.read && (
                                <div className="ml-3 flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-1"></div>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="p-4 border-t border-gray-100 text-center">
                <Link
                    to="/notifications" // Link to a dedicated notifications page (not yet created)
                    onClick={onClose}
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition"
                >
                    View All Activity <ArrowRightIcon className="w-4 h-4 ml-1" />
                </Link>
            </div>

        </div>
    );
}