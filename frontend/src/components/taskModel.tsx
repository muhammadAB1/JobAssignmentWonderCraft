import { useState } from "react";

export function AddTaskModal({ onClose, onAdd }: { onClose: any, onAdd: any }) {
    const EMPTY_FORM = { title: "", description: "", priority: "medium", status: "pending" };
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState('');


    const handleSubmit = async () => {
        // Check fields and set errors directly
        if (!form.title.trim() || !form.description.trim()) {
            setErrors('Please fill the require fields');
            return;
        }

        // No errors → add task
        onAdd({ ...form, createdAt: new Date(), id: Date.now() });
        try {
            await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error: any) {
            error.message || 'An unexpected error occurred';
            return null;
        }

        // Close modal
        onClose();
    };





    return (
        <div
            onClick={onClose}
            style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", animation: "fadeIn 0.15s ease" }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "calc(var(--radius) + 4px)", padding: "28px", width: "100%", maxWidth: 480, margin: "0 16px", display: "flex", flexDirection: "column", gap: "20px", boxShadow: "0px 24px 48px hsl(0 0% 0% / 0.18)", animation: "slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                        <div className="mb-[4px] text-[11px] font-bold tracking-[0.08em] uppercase text-muted-foreground">New Task</div>
                        <h2 className='m-0 text-[18px] font-bold'>Add a task</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center w-8 h-8 rounded-md border border-border text-[14px] text-muted-foreground transition-all duration-150
                                   hover:bg-muted hover:text-foreground" >
                        ✕
                    </button>
                </div>

                {/* Title */}
                <div className='flex flex-col gap-[6px]'>
                    <label>Title</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => { setForm((f) => ({ ...f, title: e.target.value })); }}
                        placeholder="Enter task title..."
                        className={`w-full bg-muted border px-3 py-[10px] text-[13px] text-foreground font-mono outline-none transition-colors duration-150 box-border
                            ${errors ? "border-[#e78a53]" : "border-border"}
                          `}
                    />
                    {errors && <span style={{ fontSize: "11px", color: "#e78a53" }}>{errors}</span>}
                </div>

                {/* Description */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label>Description</label>
                    <textarea
                        value={form.description}
                        onChange={(e) => { setForm((f) => ({ ...f, description: e.target.value })) }}
                        rows={3}
                        placeholder="Enter task description..."
                        className={`w-full box-border bg-muted border rounded-md px-3 py-[10px] text-[13px] text-foreground font-mono outline-none transition-colors duration-150
                            ${errors ? "border-[#e78a53]" : "border-border"} 
                            `}
                    />
                    {errors && <span style={{ fontSize: "11px", color: "#e78a53" }}>{errors}</span>}
                </div>

                {/* Priority */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label>Priority</label>
                    <div className="flex gap-2">
                        {["low", "medium", "high"].map(p => {
                            return (
                                <button onClick={() => setForm((f) => ({ ...f, priority: p }))}
                                    className={`
                                    flex-1 text-center px-3 py-2 rounded-md text-[12px] font-semibold font-mono transition-all duration-150 cursor-pointer
                                    ${form['priority'] === p
                                            ? `bg-[rgba(136,136,136,0.1)] border border-[#d87943] text-[#d87943]`
                                            : "bg-transparent border border-border text-muted-foreground"
                                        }
                                  `}
                                >
                                    {p}
                                </button>
                            )
                        })}
                    </div>

                </div>

                {/* Status */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label>Status</label>
                    <div className="flex gap-2">

                        {["pending", "in-progress", "completed"].map(p => {
                            return (
                                <button onClick={() => setForm((f) => ({ ...f, status: p }))}
                                    className={`
                                    flex-1 text-center px-3 py-2 rounded-md text-[12px] font-semibold font-mono transition-all duration-150 cursor-pointer
                                    ${form['status'] === p
                                            ? `bg-[rgba(136,136,136,0.1)] border border-[#d87943] text-[#d87943]`
                                            : "bg-transparent border border-border text-muted-foreground"
                                        }
                                  `}
                                >
                                    {p}
                                </button>
                            )
                        })}
                    </div>

                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">

                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-border rounded-md text-[13px] font-semibold text-muted-foreground font-mono transition-colors duration-150 
                        hover:bg-muted hover:text-foreground"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="flex-2 px-4 py-2 rounded-md text-[13px] font-bold text-primary-foreground font-mono bg-primary transition-opacity duration-150 hover:opacity-90"
                    >
                        Add Task →
                    </button>
                </div>
            </div>
        </div>
    );
}