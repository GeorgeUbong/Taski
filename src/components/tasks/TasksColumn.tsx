// FILE: src/components/tasks/TaskColumn.tsx
import React, { useState } from "react";
import type { ReactNode } from "react";

interface TaskColumnProps {
    title: string;
    children: ReactNode;
    status: string; // Display status (e.g., "To Do")
    dbStatus?: string; // Database status (e.g., "todo") for comparison
    onDropTask: (taskId: string, newStatus: string) => void;
    count?: number; // Optional count prop for better control
}

export default function TaskColumn({ title, children, status, dbStatus, onDropTask, count }: TaskColumnProps) {
    const [isOver, setIsOver] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsOver(true);
    };

    const handleDragLeave = () => {
        setIsOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsOver(false);
        const taskId = e.dataTransfer.getData("taskId");
        const currentStatus = e.dataTransfer.getData("currentStatus");
        
        // Only update if the status actually changed (compare database statuses)
        if (taskId && dbStatus && currentStatus !== dbStatus) {
            onDropTask(taskId, status);
        } else if (taskId && !dbStatus) {
            // Fallback if dbStatus not provided
            onDropTask(taskId, status);
        }
    };

    // Use provided count or calculate from children
    const taskCount = count !== undefined ? count : React.Children.count(children);

    return (
        <div
            className={`flex-1 min-w-[280px] lg:min-w-[320px] p-4 rounded-lg min-h-[500px] bg-gray-50
        ${isOver ? "bg-blue-50 ring-2 ring-blue-300" : ""} transition-all duration-200`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    {title}
                </h3>
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full min-w-[24px] text-center">
                    {taskCount}
                </span>
            </div>
            <div className="flex flex-col gap-3">{children}</div>
        </div>
    );
}
