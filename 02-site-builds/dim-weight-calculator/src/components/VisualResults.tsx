import React, { useEffect, useRef } from "react";

interface CarrierResult {
  carrier: string;
  label: string;
  dimWeight: number;
  billableWeight: number;
  actualWeight: number;
  unitLabel: string;
  divisor: number;
}

interface VisualResultsProps {
  results: CarrierResult[];
  dimensions: { length: string; width: string; height: string };
  actualWeight: string;
  unitLabel: string;
}

export function VisualResults({ results, dimensions, actualWeight, unitLabel }: VisualResultsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".bar-animate").forEach((bar, i) => {
            const htmlBar = bar as HTMLElement;
            setTimeout(() => {
              htmlBar.style.width = htmlBar.dataset.width || "0%";
            }, i * 120);
          });
          el.querySelectorAll(".counter-animate").forEach((counter, i) => {
            const htmlCounter = counter as HTMLElement;
            const target = parseFloat(htmlCounter.dataset.target || "0");
            const duration = 800;
            const start = performance.now();

            function tick(now: number) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              htmlCounter.textContent = (target * eased).toFixed(1);
              if (progress < 1) requestAnimationFrame(tick);
            }
            setTimeout(() => requestAnimationFrame(tick), i * 150);
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const maxBillable = Math.max(...results.map((r) => r.billableWeight), 1);
  const actualW = parseFloat(actualWeight) || 0;
  const savingsCarrier = results.reduce((best, r) =>
    r.billableWeight < best.billableWeight ? r : best, results[0]);
  const worstCarrier = results.reduce((worst, r) =>
    r.billableWeight > worst.billableWeight ? r : worst, results[0]);
  const potentialSaving = worstCarrier ? worstCarrier.billableWeight - savingsCarrier.billableWeight : 0;

  const carrierColors: Record<string, string> = {
    fedex: "#4f46e5",
    ups: "#8b4513",
    usps: "#2563eb",
    dhl: "#dc2626",
    custom: "#64748b",
  };

  const carrierIcons: Record<string, string> = {
    fedex: "📦",
    ups: "📦",
    usps: "📫",
    dhl: "🌐",
    custom: "⚙️",
  };

  return (
    <div ref={sectionRef} className="visual-results">
      {/* Billable weight comparison cards */}
      <div className="result-cards">
        {results.map((r, i) => {
          const barPct = Math.max(8, Math.round((r.billableWeight / maxBillable) * 100));
          const isBest = r.carrier === savingsCarrier.carrier;
          const overActual = r.billableWeight - actualW;

          return (
            <div
              key={r.carrier}
              className={`result-card ${isBest ? "result-card-best" : ""}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="result-card-header">
                <span className="carrier-badge" style={{ background: carrierColors[r.carrier] }}>
                  {carrierIcons[r.carrier]} {r.label}
                </span>
                {isBest && <span className="best-tag">Lowest cost</span>}
              </div>

              <div className="result-card-body">
                <div>
                  <span className="result-number counter-animate" data-target={String(r.billableWeight)}>
                    0.0
                  </span>
                  <span className="result-unit">{r.unitLabel}</span>
                </div>
                <p className="result-label">billable weight</p>
              </div>

              <div className="result-bar-wrap">
                <div
                  className="result-bar bar-animate"
                  data-width={`${barPct}%`}
                  style={{ background: carrierColors[r.carrier], width: "0%" }}
                />
              </div>

              <div className="result-detail">
                <span className="detail-item">
                  DIM: <strong>{r.dimWeight} {r.unitLabel}</strong>
                </span>
                <span className="detail-item">
                  Actual: <strong>{actualW} {r.unitLabel}</strong>
                </span>
                {overActual > 0 && (
                  <span className="detail-overcharge">
                    +{overActual.toFixed(1)} {r.unitLabel} over actual
                  </span>
                )}
              </div>

              {!isBest && potentialSaving > 0 && (
                <p className="saving-hint">
                  Switch to {savingsCarrier.label}: save ≈{potentialSaving.toFixed(1)} {r.unitLabel}/pkg
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Visual comparison: box vs actual */}
      <div className="visual-comparison">
        <div className="visual-box">
          <div className="box-3d">
            <div className="box-face box-front">{dimensions.length}"</div>
            <div className="box-face box-side">{dimensions.width}"</div>
            <div className="box-face box-top">{dimensions.height}"</div>
          </div>
          <p className="visual-label">Your box: {dimensions.length}×{dimensions.width}×{dimensions.height}"</p>
        </div>

        <div className="visual-arrow">
          <div className="arrow-line" />
          <div className="arrow-head">▶</div>
        </div>

        <div className="visual-result">
          <div className="weight-comparison-pills">
            <div className="weight-pill weight-pill-dim">
              <span className="weight-pill-value">{results[0]?.dimWeight || "—"}</span>
              <span className="weight-pill-label">DIM {unitLabel}</span>
            </div>
            <span className="weight-vs">vs</span>
            <div className="weight-pill weight-pill-actual">
              <span className="weight-pill-value">{actualW}</span>
              <span className="weight-pill-label">Actual {unitLabel}</span>
            </div>
          </div>
          <p className="visual-label">
            {results[0] && results[0].billableWeight > actualW
              ? "Carrier bills the HIGHER weight"
              : "Actual weight is higher — billed by scale"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VisualResults;
