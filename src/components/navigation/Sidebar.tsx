// FILE: src/components/navigation/Sidebar.tsx
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const links = [
        { name: "Dashboard", to: "/dashboard" },
        { name: "Board", to: "/board" },
        { name: "Departments", to: "/departments" },
        { name: "Teams", to: "/teams" },
        { name: "Completed", to: "/completed" },
    ];

    return (
        <aside className="w-60 bg-white border-r h-full p-4">
            <h1 className="text-xl font-bold mb-6">Taski</h1>

            <nav className="space-y-3">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `block p-2 rounded-md transition 
              ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`
                        }
                    >
                        {link.name}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
