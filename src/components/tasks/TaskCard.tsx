import { EllipsisVerticalIcon, CalendarIcon } from "@heroicons/react/24/outline";
import type { Task } from "../../lib/fetchTasks";

// Helper to get status dot color
const getStatusDotColor = (status: Task['status']): string => {
    switch (status) {
        case 'todo': return 'bg-green-500';
        case 'in_progress': return 'bg-yellow-500';
        case 'completed': return 'bg-blue-500';
        default: return 'bg-gray-400';
    }
};

// Helper to format date
const formatDate = (dateString?: string): string => {
    if (!dateString) return 'No date';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
        return 'Invalid date';
    }
};

// Helper to convert database status to display format
const formatStatus = (status: Task['status']): string => {
    switch (status) {
        case 'todo': return 'To Do';
        case 'in_progress': return 'In Progress';
        case 'completed': return 'Done';
        default: return status;
    }
};

// Helper to convert database priority to display format
const formatPriority = (priority: Task['priority']): 'High' | 'Medium' | 'Low' => {
    switch (priority) {
        case 'high': return 'High';
        case 'medium': return 'Medium';
        case 'low': return 'Low';
        default: return 'Medium';
    }
};

interface TaskCardProps {
    task: Task;
    columnColor: string; // Passed from the column to style the left border
}

/**
 * Utility to get priority styling for the badge
 */
const getPriorityStyles = (priority: Task['priority']) => {
    switch (priority) {
        case 'high':
            return 'text-red-600 bg-red-100 border-red-300';
        case 'medium':
            return 'text-yellow-600 bg-yellow-100 border-yellow-300';
        case 'low':
            return 'text-green-600 bg-green-100 border-green-300';
        default:
            return 'text-gray-600 bg-gray-100 border-gray-300';
    }
};

/**
 * Renders a detailed, draggable card for a single task item.
 */
export default function TaskCard({ task, columnColor }: TaskCardProps) {
    const { title, description, priority, assignee, id, status, created_at } = task;
    const displayPriority = formatPriority(priority);
    const statusDotColor = getStatusDotColor(status);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        // Set the data being dragged: the task ID and its current status
        e.dataTransfer.setData("taskId", id);
        e.dataTransfer.setData("currentStatus", status);
        // Add visual feedback while dragging
        e.currentTarget.classList.add("opacity-50", "ring-2", "ring-blue-300");
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        // Clean up the class when dragging stops
        e.currentTarget.classList.remove("opacity-50", "ring-2", "ring-blue-300");
    };

    // Extract subtitle from description or use a default
    const subtitle = description || "Task";

    return (
        <div
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-grab hover:shadow-md transition-all duration-200 group relative"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            {/* Status Dot - Top Right */}
            <div className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full ${statusDotColor}`} />

            {/* Title */}
            <div className="pr-6 mb-2">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                    {title}
                </h3>
            </div>

            {/* Subtitle */}
            <div className="mb-3">
                <p className="text-xs text-gray-500">
                    {subtitle}
                </p>
            </div>

            {/* Footer: Due Date */}
            <div className="flex justify-end items-center pt-3 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500">
                    <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                    <span>{formatDate(created_at)}</span>
                </div>
            </div>

            {/* Options Button - Hidden by default, shown on hover */}
            <button
                className="absolute top-2 right-2 p-1.5 rounded hover:bg-gray-100 transition opacity-0 group-hover:opacity-100"
                aria-label="More options"
            >
                <EllipsisVerticalIcon className="w-4 h-4 text-gray-400" />
            </button>
        </div>
    );
}