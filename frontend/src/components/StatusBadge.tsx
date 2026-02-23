const STATUS_CONFIG: any = {
    pending: {
        label: "Pending",
        dot: "#888888",
        bg: "rgba(136,136,136,0.08)",
        border: "rgba(136,136,136,0.18)",
        text: "#888888",
    },
    "in-progress": {
        label: "In Progress",
        dot: "#e78a53",
        bg: "rgba(231,138,83,0.08)",
        border: "rgba(231,138,83,0.2)",
        text: "#e78a53",
    },
    completed: {
        label: "Completed",
        dot: "#5f8787",
        bg: "rgba(95,135,135,0.08)",
        border: "rgba(95,135,135,0.2)",
        text: "#5f8787",
    },
};



export function StatusBadge({ status }: { status: string }) {
    const cfg = STATUS_CONFIG[status];
    return (
        <span
            className="inline-flex items-center gap-[6px] px-[10px] py-[3px] rounded-full text-[11px] font-semibold tracking-[0.04em] uppercase whitespace-nowrap"
            style={{
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                color: cfg.text,
            }}
        >
            <span
                className="w-[6px] h-[6px] rounded-full shrink-0"
                style={{ background: cfg.dot }}
            />
            {cfg.label}
        </span>
    );
}
