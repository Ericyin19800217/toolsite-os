import React, { useState, useCallback } from "react";

type FeedbackType = "bug" | "suggestion" | "praise";

const TYPES: { key: FeedbackType; label: string }[] = [
  { key: "bug", label: "Bug" },
  { key: "suggestion", label: "Suggestion" },
  { key: "praise", label: "Praise" },
];

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<FeedbackType>("suggestion");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!message.trim()) return;
      const typeLabel = TYPES.find((t) => t.key === type);
      window.location.href = `mailto:ericyin1980@outlook.com?subject=${encodeURIComponent(`[${typeLabel?.label}] Dimensional Weight Calculator`)}&body=${encodeURIComponent(`Type: ${typeLabel?.label}\nPage: ${window.location.href}\n\n${message}\n\n---\nSubmitted from: ${window.location.href}`)}`;
      setSent(true);
      setMessage("");
      setTimeout(() => { setSent(false); setOpen(false); }, 3000);
    },
    [message, type]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
          open ? "translate-x-full opacity-0 pointer-events-none" : ""
        }`}
        style={{
          writingMode: "vertical-rl",
          background: "var(--accent, #2563eb)",
          color: "white",
          fontWeight: 600,
          fontSize: "12px",
          letterSpacing: "0.06em",
          borderRadius: "6px 0 0 6px",
          padding: "14px 10px",
          boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
        }}
        aria-label="Open feedback form"
      >
        Feedback
      </button>

      <div
        className={`fixed right-0 top-0 h-full z-50 w-full max-w-sm bg-white border-l border-[#e2e8f0] shadow-lg transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2e8f0]">
            <p className="text-[15px] font-semibold text-[#0f172a] tracking-tight">Feedback</p>
            <button type="button" onClick={() => setOpen(false)} className="text-[#94a3b8] hover:text-[#0f172a] text-xl p-1" aria-label="Close">&times;</button>
          </div>

          {sent ? (
            <div className="flex-1 flex items-center justify-center p-6 text-center">
              <div>
                <p className="text-[48px] font-light text-[#2563eb] mb-3 font-mono">&check;</p>
                <p className="text-lg font-semibold text-[#0f172a]">Sent</p>
                <p className="text-[13px] text-[#64748b] mt-1">Check your email client. Thank you.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-5 gap-4 overflow-y-auto">
              <fieldset>
                <legend className="section-label mb-2">Type</legend>
                <div className="flex gap-2">
                  {TYPES.map((t) => (
                    <button key={t.key} type="button" onClick={() => setType(t.key)}
                      className={`badge ${type === t.key ? "badge-active" : "badge-neutral"}`}>{t.label}</button>
                  ))}
                </div>
              </fieldset>
              <label className="grid gap-1.5 flex-1">
                <span className="section-label">Message</span>
                <textarea
                  className="input-field flex-1 min-h-[160px] resize-y"
                  style={{fontSize:"14px",lineHeight:"1.6"}}
                  placeholder={type === "bug" ? "What went wrong?" : type === "suggestion" ? "What would make this better?" : "What's working well?"}
                  value={message} onChange={(e) => setMessage(e.target.value)} required
                />
              </label>
              <button type="submit" className="btn-primary w-full justify-center flex" disabled={!message.trim()}>Send Feedback</button>
              <p className="text-[11px] text-[#94a3b8] text-center">Opens your email client. No data stored.</p>
            </form>
          )}
        </div>
      </div>

      {open && <div className="fixed inset-0 z-40 bg-black/20 md:hidden" onClick={() => setOpen(false)} aria-hidden="true" />}
    </>
  );
}

export default FeedbackWidget;
