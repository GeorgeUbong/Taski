// FILE: src/components/tasks/TaskColumn.tsx
import React, { useState } from "react";
import type { ReactNode } from "react";

interface TaskColumnProps {
    title: string;
    children: ReactNode;
    status: string;
    onDropTask: (taskId: string, newStatus: string) => void;
}

export default function TaskColumn({ title, children, status, onDropTask }: TaskColumnProps) {
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
        if (taskId) {
            onDropTask(taskId, status);
        }
    };

    return (
        <div
            className={`flex-1 p-4 rounded-xl min-h-[400px] border border-gray-200
        ${isOver ? "bg-blue-100" : "bg-gray-50"} transition-colors`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <h3 className="text-lg font-semibold mb-4 flex justify-between items-center">
                {title} <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded">{React.Children.count(children)}</span>
            </h3>
            <div className="flex flex-col gap-3">{children}</div>
        </div>
    );
}
