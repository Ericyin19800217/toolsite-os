import React, { useState, useCallback } from "react";

type FeedbackType = "bug" | "suggestion" | "praise";

const TYPES: { key: FeedbackType; label: string; emoji: string }[] = [
  { key: "bug", label: "Bug", emoji: "\u{1F41B}" },
  { key: "suggestion", label: "Suggestion", emoji: "\u{1F4A1}" },
  { key: "praise", label: "Praise", emoji: "\u{1F44F}" },
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
        `User Agent: ${navigator.userAgent}`,
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
      {/* Floating trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 px-4 py-3 transition-all duration-300 ${
          open
            ? "translate-x-full opacity-0 pointer-events-none"
            : "translate-x-0"
        }`}
        style={{
          writingMode: "vertical-rl",
          background: "var(--accent-amber, #f59e0b)",
          color: "#0f1723",
          fontWeight: 700,
          fontSize: "13px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          borderRadius: "6px 0 0 6px",
          boxShadow: "0 0 30px rgba(245, 158, 11, 0.25)",
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
          background: "var(--bg-surface, #111827)",
          borderLeft: "1px solid var(--border-default, #1e3048)",
          boxShadow: "-8px 0 40px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e3048]">
            <div>
              <p className="display-font text-xl tracking-wider text-[#edf0f5]">
                Feedback
              </p>
              <p className="text-[10px] tracking-widest uppercase text-[#566584] mt-0.5">
                Help improve this calculator
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[#566584] hover:text-[#edf0f5] transition-colors text-2xl leading-none p-1"
              aria-label="Close feedback"
            >
              &times;
            </button>
          </div>

          {/* Form */}
          {sent ? (
            <div className="flex-1 flex items-center justify-center p-6 text-center">
              <div>
                <p className="text-4xl mb-3">&#9993;</p>
                <p className="display-font text-2xl tracking-wider text-[#f59e0b]">
                  Sent!
                </p>
                <p className="text-xs text-[#8899b4] mt-2">
                  Your email client should open. Thank you!
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-5 gap-5 overflow-y-auto">
              {/* Type selector */}
              <fieldset>
                <legend className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#566584] mb-3">
                  What kind of feedback?
                </legend>
                <div className="flex gap-2">
                  {TYPES.map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setType(t.key)}
                      className={`flex-1 px-3 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
                        type === t.key
                          ? "badge-amber"
                          : "badge-muted hover:border-[#f59e0b]/30"
                      }`}
                    >
                      <span className="mr-1.5" aria-hidden="true">{t.emoji}</span>
                      {t.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Message */}
              <label className="grid gap-2 flex-1">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#566584]">
                  Your message
                </span>
                <textarea
                  className="input-logistics px-4 py-3 text-sm flex-1 min-h-[160px] resize-y font-normal tracking-normal"
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

              {/* Submit */}
              <button
                type="submit"
                className="btn-primary w-full py-3 text-sm font-semibold tracking-wider uppercase"
                disabled={!message.trim()}
              >
                Send Feedback
              </button>

              <p className="text-[10px] text-[#566584] text-center leading-relaxed">
                Opens your email client. No data is stored on our servers.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default FeedbackWidget;
