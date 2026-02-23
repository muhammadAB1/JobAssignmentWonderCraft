const PRIORITY_CONFIG: any = {
    low: { label: "Low", bg: "rgba(136,136,136,0.1)", text: "#888888", border: "rgba(136,136,136,0.2)" },
    medium: { label: "Medium", bg: "rgba(251,203,151,0.15)", text: "#d87943", border: "rgba(216,121,67,0.25)" },
    high: { label: "High", bg: "rgba(231,138,83,0.12)", text: "#e78a53", border: "rgba(231,138,83,0.3)" },
};


export function PriorityBadge({ priority }: { priority: string }) {
    const cfg = PRIORITY_CONFIG[priority];
    const arrows: any = { low: "↓", medium: "→", high: "↑" };
    return (
        <span
            className="inline-flex items-center gap-1 py-[3px] px-[9px] rounded-[6px] text-[11px] font-bold uppercase tracking-wide font-mono whitespace-nowrap"
            style={{
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                color: cfg.text,
                letterSpacing: "0.05em"
            }}
        >
            <span style={{ fontSize: "13px", lineHeight: 1 }}>{arrows[priority]}</span>
            {cfg.label}
        </span>
    );
}