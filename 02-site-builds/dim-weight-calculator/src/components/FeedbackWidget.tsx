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
      const subject = `[${typeLabel?.label ?? "Feedback"}] Dimensional Weight Calculator`;
      const body = [
        `Type: ${typeLabel?.label ?? type}`,
        `Page: ${window.location.href}`,
        ``,
        message,
        ``,
        `---`,
        `Submitted from: ${window.location.href}`,
      ].join("\n");

      window.location.href = `mailto:ericyin1980@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSent(true);
      setMessage("");
      setTimeout(() => {
        setSent(false);
        setOpen(false);
      }, 3000);
    },
    [message, type]
  );

  return (
    <>
      {/* Floating trigger — vintage postcard tab */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
          open ? "translate-x-full opacity-0 pointer-events-none" : "translate-x-0"
        }`}
        style={{
          writingMode: "vertical-rl",
          background: "var(--red-airmail, #c41e3a)",
          color: "var(--paper-bright, #fffdf5)",
          fontWeight: 700,
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontFamily: "'Courier Prime', monospace",
          borderRadius: "4px 0 0 4px",
          padding: "16px 10px",
          boxShadow: "1px 0 8px rgba(44,24,16,0.12)",
        }}
        aria-label="Open feedback form"
      >
        Feedback
      </button>

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full z-50 w-full max-w-sm transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "var(--paper-bright, #fffdf5)",
          borderLeft: "1px dashed var(--border-dashed, #c4b5a2)",
          boxShadow: "-4px 0 24px rgba(44,24,16,0.1)",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-dashed border-[#c4b5a2]">
            <div>
              <p className="text-xs tracking-[0.1em] uppercase text-[#9b8c7c] font-semibold" style={{fontFamily:"'Courier Prime',monospace"}}>
                &#9993; Feedback
              </p>
              <p className="text-lg italic text-[#5c4a3a] mt-0.5">
                Send a note
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[#9b8c7c] hover:text-[#c41e3a] transition-colors text-xl p-1"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          {sent ? (
            <div className="flex-1 flex items-center justify-center p-6 text-center">
              <div>
                <p className="text-4xl mb-3">&#9993;</p>
                <p className="text-xl italic text-[#c41e3a]">Posted!</p>
                <p className="text-xs text-[#9b8c7c] mt-2">Your email client should open. Thank you.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-6 gap-5 overflow-y-auto">
              <fieldset>
                <legend className="form-label mb-3">Type</legend>
                <div className="flex gap-2">
                  {TYPES.map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setType(t.key)}
                      className={`badge-carrier px-4 py-2 text-xs ${
                        type === t.key ? "badge-carrier-active" : ""
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="grid gap-1.5 flex-1">
                <span className="form-label">Message</span>
                <textarea
                  className="input-parcel px-4 py-3 text-sm flex-1 min-h-[180px] resize-y"
                  style={{fontFamily:"Newsreader,serif",fontSize:"15px",letterSpacing:"0"}}
                  placeholder={
                    type === "bug"
                      ? "What went wrong? What did you expect?"
                      : type === "suggestion"
                        ? "What would make this better?"
                        : "What's working well for you?"
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </label>

              <button
                type="submit"
                className="btn-post w-full py-3"
                disabled={!message.trim()}
              >
                Post Feedback
              </button>

              <p className="text-[10px] text-[#9b8c7c] text-center italic">
                Opens your email client. No data stored on our servers.
              </p>
            </form>
          )}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-[#2c1810]/30 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default FeedbackWidget;
