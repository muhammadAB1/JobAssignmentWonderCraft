import { PriorityBadge } from "./PriorityBadge";
import { StatusBadge } from "./StatusBadge";
import { type taskList } from '../../types'
import { Trash2 } from 'lucide-react';
import React from "react";


export function TaskCard({ task, setTasks }: { task: taskList, setTasks: React.Dispatch<React.SetStateAction<taskList[]>> }) {
    const isCompleted = task.status === "completed";

    const handleToggle = async (id: string) => {
        try {
            await fetch(`http://localhost:5000/api/tasks/status/${id}/${task.status === 'completed' ? 'pending' : 'completed'}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error: any) {
            error.message || 'An unexpected error occurred';
            return null;
        }


        setTasks((prevTasks) =>
            prevTasks.map(t =>
                t._id === id
                    ? {
                        ...t,
                        status: t.status === "completed"
                            ? "pending"
                            : "completed" as taskList["status"],
                    }
                    : t
            )
        );
    };

    
    const handleDelete = async (id: string) => {
        setTasks((prevTask) => prevTask.filter(t => t._id === id))
        try {
            await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error: any) {
            error.message || 'An unexpected error occurred';
            return null;
        }

    }

    return (
        <div
            className={`
                flex flex-col gap-3 rounded-(--radius) px-6 py-5
                border
                transition-all duration-200
                bg--background shadow-[0px_1px_4px_0px_hsl(0_0%_0%/0.04)] translate-y-0
                hover:bg-card hover:shadow-[0px_4px_16px_0px_hsl(0_0%_0%/0.08)]

            `}
        >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
                    <button
                        onClick={() => handleToggle(task._id)}
                        title={isCompleted ? "Mark as pending" : "Mark as completed"}
                        className={
                            `
                                w-[18px] h-[18px] flex items-center justify-center shrink-0 rounded-full
                                transition-all duration-200 cursor-pointer
                                ${isCompleted
                                ? "bg-[#5f8787] border-none"
                                :
                                "hover:bg-[rgba(95,135,135,0.15)] hover:border hover:border-[#5f8787] bg-transparent border border-muted-foreground"
                            }
                            `
                        }
                    >
                        {isCompleted && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2 5L4.2 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </button>

                    <span
                        className={`
                            text-[14px] font-semibold 
                            ${isCompleted ? "text-muted-foreground line-through" : "text-foreground"}
                            decoration-muted-foreground
                            font-mono leading-tight 
                            overflow-hidden text-ellipsis whitespace-nowrap 
                            transition-colors duration-200
                        `}
                    >
                        {task.title}
                    </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    <PriorityBadge priority={task.priority} />
                    <StatusBadge status={task.status} />
                    <Trash2 size={16} color="red" cursor={'pointer'} onClick={() => handleDelete(task._id)} />

                </div>
            </div>

            <p className="text-[13px] text-muted-foreground leading-[1.6] m-0 pl-7">
                {task.description}
            </p>

            {task.createdAt && (
                <div className="pl-7 text-[11px] text-muted-foreground font-mono opacity-50">
                    {new Date(task.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>
            )}
        </div>
    );
}