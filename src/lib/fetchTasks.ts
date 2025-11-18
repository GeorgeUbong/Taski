// FILE: src/lib/tasks.ts
import { supabase } from "./supabase";

export type Task = {
    id: string;
    title: string;
    description?: string;
    status: "todo" | "in_progress" | "completed";
    priority: "low" | "medium" | "high";
    assignee?: string;
    created_at: string;
    updated_at: string;
};

export const getTasks = async (): Promise<Task[]> => {
    const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
};

export const updateTaskStatus = async (id: string, status: Task["status"]) => {
    const { error } = await supabase
        .from("tasks")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);

    if (error) throw error;
};