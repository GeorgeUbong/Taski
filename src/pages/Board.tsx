import DashboardLayout from "../layouts/DashboardLayout";
import TaskColumn from "../components/tasks/TasksColumn";
// Note: We'll create the dedicated TaskCard component later, 
// using a simple div for now.

// Placeholder data structure for demonstration
const mockTasks = [
    { id: 1, title: "Design database schema for profiles", status: "To Do" },
    { id: 2, title: "Implement AuthContext and useAuth hook", status: "Done" },
    { id: 3, title: "Styling Dashboard layout with Tailwind", status: "In Progress" },
    { id: 4, title: "Write initial RLS policies for profiles table", status: "To Do" },
    { id: 5, title: "Set up project board UI (this task)", status: "In Progress" },
    { id: 6, title: "Test magic link login flow", status: "Done" },
    { id: 7, title: "Integrate Profile Context and load user data", status: "Done" },
    { id: 8, title: "Build the Departments page structure", status: "To Do" },
];

// Helper to filter tasks by status
const filterTasks = (status: string) =>
    mockTasks.filter(task => task.status === status);

export default function Board() {
    const todoTasks = filterTasks("To Do");
    const inProgressTasks = filterTasks("In Progress");
    const doneTasks = filterTasks("Done");

    // Define column data, including a color code
    const columns = [
        {
            title: "To Do",
            status: "To Do",
            tasks: todoTasks,
            color: "#f59e0b" // Amber-500
        },
        {
            title: "In Progress",
            status: "In Progress",
            tasks: inProgressTasks,
            color: "#3b82f6" // Blue-500
        },
        {
            title: "Completed",
            status: "Done",
            tasks: doneTasks,
            color: "#4ade80" // Green-400
        },
    ];

    return (
        <DashboardLayout>
            <div className="flex flex-col h-full">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Project Board</h2>

                {/* Main Board Container: uses flex for horizontal layout and overflow-x-auto for responsiveness */}
                <div className="flex-1 flex space-x-6 overflow-x-auto pb-4">

                    {columns.map((column) => (
                        <TaskColumn
                            key={column.status}
                            title={column.title}
                            count={column.tasks.length}
                            color={column.color}
                        >
                            {/* Task Placeholder Cards */}
                            {column.tasks.map((task) => (
                                <div
                                    key={task.id}
                                    // Simple card styling with left border color matching the column
                                    className="bg-white p-4 rounded-xl shadow-sm cursor-grab hover:shadow-md transition duration-150 border-l-4"
                                    style={{ borderLeftColor: column.color }}
                                >
                                    <p className="font-medium text-gray-800">{task.title}</p>
                                    <span className="text-xs text-gray-500 mt-2 block">ID: {task.id}</span>
                                </div>
                            ))}

                            {/* Optional: Placeholder for "No tasks" message */}
                            {column.tasks.length === 0 && (
                                <div className="p-4 text-center text-gray-400 text-sm italic">
                                    No tasks here yet.
                                </div>
                            )}

                        </TaskColumn>
                    ))}

                </div>
            </div>
        </DashboardLayout>
    );
}