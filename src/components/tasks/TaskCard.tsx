import { EllipsisVerticalIcon, CalendarIcon } from "@heroicons/react/24/outline";

// Define the interface for a single task item, matching the updated mock data
export interface Task { // <-- Exported Task interface
    id: number;
    title: string;
    status: 'To Do' | 'In Progress' | 'Done';
    priority: 'High' | 'Medium' | 'Low';
    assignee: string; // Placeholder for assignee initials
}

interface TaskCardProps {
    task: Task;
    columnColor: string; // Passed from the column to style the left border
}

/**
 * Utility to get priority styling for the badge
 */
const getPriorityStyles = (priority: Task['priority']) => {
    switch (priority) {
        case 'High':
            return 'text-red-600 bg-red-100 border-red-300';
        case 'Medium':
            return 'text-yellow-600 bg-yellow-100 border-yellow-300';
        case 'Low':
            return 'text-green-600 bg-green-100 border-green-300';
        default:
            return 'text-gray-600 bg-gray-100 border-gray-300';
    }
};

/**
 * Renders a detailed, draggable card for a single task item.
 */
export default function TaskCard({ task, columnColor }: TaskCardProps) {
    const { title, priority, assignee, id, status } = task;

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        // Set the data being dragged: the task ID and its current status
        e.dataTransfer.setData("taskId", id.toString());
        e.dataTransfer.setData("currentStatus", status);
        // Add visual feedback while dragging
        e.currentTarget.classList.add("opacity-50", "ring-4", "ring-blue-300");
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        // Clean up the class when dragging stops
        e.currentTarget.classList.remove("opacity-50", "ring-4", "ring-blue-300");
    };

    return (
        <div
            className="bg-white p-4 rounded-xl shadow-lg cursor-grab hover:shadow-xl transition duration-150 border-l-4 group"
            // Apply column color dynamically to the left border
            style={{ borderLeftColor: columnColor }}
            // Drag-and-Drop attributes
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex justify-between items-start mb-2">
                <p className="font-semibold text-gray-800 text-base leading-snug break-words pr-4">
                    {title}
                </p>
                <button
                    className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition opacity-0 group-hover:opacity-100 p-1 -mt-1 -mr-1"
                    aria-label="More options"
                >
                    <EllipsisVerticalIcon className="w-5 h-5" />
                </button>
            </div>

            {/* Priority and ID */}
            <div className="flex items-center space-x-2 mb-3">
                <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getPriorityStyles(priority)}`}
                >
                    {priority}
                </span>
                <span className="text-xs text-gray-400">Task ID: {id}</span>
            </div>

            {/* Footer: Assignee and Due Date */}
            <div className="flex justify-between items-center border-t pt-3 mt-3 border-gray-100">
                {/* Assignee Avatar */}
                <div className="flex items-center -space-x-2">
                    {/* Avatar Stack Placeholder */}
                    <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white ring-2 ring-white shadow">
                        {assignee.charAt(0).toUpperCase()}
                    </div>
                </div>

                {/* Due Date Placeholder */}
                <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4 mr-1 text-gray-400" />
                    <span>Oct 25</span> {/* Mock Due Date */}
                </div>
            </div>

        </div>
    );
}