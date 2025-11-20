import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import TaskColumn from "../components/tasks/TasksColumn";
import TaskCard from "../components/tasks/TaskCard";
import { getTasks, updateTaskStatus, type Task } from "../lib/fetchTasks";
import { MagnifyingGlassIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";

export default function Board() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch tasks on component mount
    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            setLoading(true);
            const fetchedTasks = await getTasks();
            setTasks(fetchedTasks);
        } catch (error: any) {
            console.error("Error loading tasks:", error);
            toast.error("Failed to load tasks: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Helper to filter tasks by status and search query
    const filterTasks = (status: Task['status']) => {
        let filtered = tasks.filter(task => task.status === status);
        
        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(task => 
                task.title.toLowerCase().includes(query) ||
                task.description?.toLowerCase().includes(query)
            );
        }
        
        return filtered;
    };

    // Handle task drop - update status in database
    const handleTaskDrop = async (taskId: string, newStatus: string) => {
        try {
            // Map display status back to database status
            const dbStatus: Task['status'] = 
                newStatus === "To Do" ? "todo" :
                newStatus === "In Progress" ? "in_progress" :
                "completed";

            await updateTaskStatus(taskId, dbStatus);
            
            // Update local state
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? { ...task, status: dbStatus } : task
                )
            );
            
            toast.success("Task moved successfully!");
        } catch (error: any) {
            console.error("Error updating task:", error);
            toast.error("Failed to update task: " + error.message);
            // Reload tasks on error to sync state
            loadTasks();
        }
    };

    const todoTasks = filterTasks("todo");
    const inProgressTasks = filterTasks("in_progress");
    const doneTasks = filterTasks("completed");

    // Define column data, including a color code
    const columns = [
        {
            title: "To Do",
            status: "To Do",
            dbStatus: "todo" as Task['status'],
            tasks: todoTasks,
            color: "#f59e0b" // Amber-500
        },
        {
            title: "In Progress",
            status: "In Progress",
            dbStatus: "in_progress" as Task['status'],
            tasks: inProgressTasks,
            color: "#3b82f6" // Blue-500
        },
        {
            title: "Completed",
            status: "Done",
            dbStatus: "completed" as Task['status'],
            tasks: doneTasks,
            color: "#4ade80" // Green-400
        },
    ];

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-600 text-lg">Loading tasks...</div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <Toaster position="top-center" />
            <div className="flex flex-col h-full">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <Link to="/dashboard" className="hover:text-gray-700">Projects</Link>
                    <ChevronRightIcon className="w-4 h-4" />
                    <span className="text-gray-900 font-medium">Board</span>
                </nav>

                {/* Title and Search */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Board</h1>
                    
                    {/* Search Bar */}
                    <div className="relative max-w-md">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>
                </div>

                {/* Main Board Container: uses flex for horizontal layout and overflow-x-auto for responsiveness */}
                <div className="flex-1 flex gap-4 lg:gap-6 overflow-x-auto pb-4 -mx-4 lg:-mx-6 px-4 lg:px-6">

                    {columns.map((column) => (
                        <TaskColumn
                            key={column.status}
                            title={column.title}
                            status={column.status}
                            dbStatus={column.dbStatus}
                            onDropTask={handleTaskDrop}
                            count={column.tasks.length}
                        >
                            {/* Task Cards */}
                            {column.tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    columnColor={column.color}
                                />
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