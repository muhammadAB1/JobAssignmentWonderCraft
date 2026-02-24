import { useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";
import type { taskList } from "../../types";
import { AddTaskModal } from "./taskModel";


const FILTERS = ["all", "pending", "in-progress", "completed"];

export default function TaskList() {
    const [tasks, setTasks] = useState<taskList[]>([]);
    const [filter, setFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);

    const apis = async () => {

        try {
            let url = ''
            if (['pending', 'in-progress', 'completed'].includes(filter)) {
                // use filter here
                url = `http://localhost:5000/api/tasks?status=${filter}`;
            } else {
                url = `http://localhost:5000/api/tasks`;
            }
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json()
            setTasks(data)
        } catch (error: any) {
            error.message || 'An unexpected error occurred';
            return null;
        }
    }

    useEffect(() => {
        apis();
    }, [setTasks])



    const handleAdd = (task: taskList) => {
        setTasks((prev) => [task, ...prev]);
    };


    const filtered = tasks.filter((t) => {
        const statusMatch = filter === 'all' || t.status === filter
        const priorityMatch = priorityFilter === "all" || t.priority === priorityFilter;
        const searchMatch = !search.trim() || t.title.toLowerCase().includes(search.toLowerCase());
        return statusMatch && priorityMatch && searchMatch;
    });



    return (
        <>
            <style>{`

        .filter-btn {
          all: unset; cursor: pointer;
          font-family: Geist Mono, ui-monospace, monospace;
          font-size: 12px; font-weight: 600; padding: 6px 14px;
          border-radius: 999px; transition: all 0.15s ease;
          letter-spacing: 0.02em; color: var(--muted-foreground);
          background: transparent; border: 1px solid transparent; white-space: nowrap;
        }
        .filter-btn:hover { color: var(--foreground); border-color: var(--border); }
        .filter-btn.active { background: var(--primary); color: var(--primary-foreground); border-color: var(--primary); }
        .priority-btn {
          all: unset; cursor: pointer;
          font-family: JetBrains Mono, monospace;
          font-size: 11px; font-weight: 700; padding: 5px 12px;
          border-radius: 6px; transition: all 0.15s ease;
          letter-spacing: 0.04em; text-transform: uppercase;
          color: var(--muted-foreground); background: transparent;
          border: 1px solid var(--border); white-space: nowrap;
        }
        .priority-btn.active{ background: rgba(251,203,151,0.15); color: #d87943; border-color: rgba(216,121,67,0.3); }
       
        .search-input { font-family: Geist Mono, ui-monospace, monospace; }
        .search-input::placeholder { color: var(--muted-foreground); opacity: 0.6; }
        .search-input:focus { outline: none; }
      `}</style>


            {showModal && <AddTaskModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}

            <div style={{ minHeight: "100vh", background: "var(--background)", color: "var(--foreground)", fontFamily: "Geist Mono, ui-monospace, monospace", padding: "48px 24px" }}>
                <div style={{ maxWidth: 760, margin: "0 auto" }}>

                    {/* Header */}
                    <div style={{ marginBottom: "32px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)" }} />
                                <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
                                    Task Board
                                </span>
                            </div>
                            <h1 style={{ fontSize: "28px", fontWeight: 700, margin: 0, letterSpacing: "-0.02em", lineHeight: 1.2 }}>My Tasks</h1>
                            <p style={{ margin: "8px 0 0", fontSize: "13px", color: "var(--muted-foreground)" }}>

                            </p>
                        </div>

                        <button
                            onClick={() => setShowModal(true)}
                            style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", padding: "10px 18px", background: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius)", fontSize: "13px", fontWeight: 700, fontFamily: "Geist Mono, monospace", letterSpacing: "0.02em", transition: "opacity 0.15s, transform 0.15s", flexShrink: 0, marginTop: "6px" }}
                            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Add Task
                        </button>
                    </div>

                    {/* Search */}
                    <div style={{ position: "relative", marginBottom: "20px" }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }}>
                            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title..."
                            className="search-input w-full box-border rounded-md px-10 py-3 text-[13px] text-foreground bg-muted border border-border 
                            focus:border-primary transition-colors duration-150"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                style={{ all: "unset", cursor: "pointer", position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", fontSize: "14px", lineHeight: 1, display: "flex", alignItems: "center" }}
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Filters */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
                        <div style={{ display: "flex", gap: "4px", background: "var(--muted)", padding: "4px", borderRadius: "999px", flexWrap: "wrap" }}>
                            {FILTERS.map((f) => (
                                <button onClick={() => setFilter(f)}
                                    key={f} className={`filter-btn ${filter === f ? "active" : ""}`}>
                                    {f}
                                </button>
                            ))}
                        </div>
                        <div style={{ display: "flex", gap: "6px" }}>
                            {["all", "low", "medium", "high"].map((p) => (
                                <button key={p} className={`priority-btn ${priorityFilter === p ? `active` : ""}`} onClick={() => setPriorityFilter(p)}>
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ height: 1, background: "var(--border)", marginBottom: "20px" }} />

                    {/* Task List */}
                    {filtered.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "64px 24px", color: "var(--muted-foreground)", fontSize: "13px" }}>
                            {search ? `No tasks found for "${search}"` : "No tasks match the current filters."}
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {filtered.map((task, i) => (
                                <TaskCard key={task._id} task={task} setTasks={setTasks} />
                            ))}
                        </div>
                    )}

                    {/* Footer */}
                    <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px", color: "var(--muted-foreground)", fontFamily: "JetBrains Mono, monospace" }}>
                        <span>{filtered.length} task{filtered.length !== 1 ? "s" : ""} shown</span>
                        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--primary)" }} />
                            Live
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}