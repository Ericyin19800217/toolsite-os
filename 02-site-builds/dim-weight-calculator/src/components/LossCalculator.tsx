import React, { useEffect, useRef, useState } from "react";

interface LossCalculatorProps {
  overchargePerPackage: number;
  unitLabel: string;
}

export function LossCalculator({ overchargePerPackage, unitLabel }: LossCalculatorProps) {
  const [packagesPerMonth, setPackagesPerMonth] = useState(200);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const monthlyLoss = overchargePerPackage * packagesPerMonth;
  const annualLoss = monthlyLoss * 12;

  const milestones = [
    { label: "Per shipment", value: overchargePerPackage, prefix: "$" },
    { label: "Per month", value: monthlyLoss, prefix: "$" },
    { label: "Per year", value: annualLoss, prefix: "$" },
  ];

  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!isVisible) return;
    milestones.forEach((m, i) => {
      const el = counterRefs.current[i];
      if (!el) return;
      const target = m.value;
      const duration = 1000;
      const start = performance.now();
      function tick(now: number) {
        if (!el) return;
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${m.prefix}${(target * eased).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        if (progress < 1) requestAnimationFrame(tick);
      }
      setTimeout(() => requestAnimationFrame(tick), i * 300);
    });
  }, [isVisible, overchargePerPackage, packagesPerMonth]);

  if (overchargePerPackage <= 0) {
    return (
      <div className="loss-section" ref={sectionRef}>
        <div className="loss-empty">
          <span className="loss-empty-icon">&#9989;</span>
          <h3>Good news — your box is efficient</h3>
          <p>Your actual weight exceeds dimensional weight. The carrier will bill by scale weight. No overcharge here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="loss-section" ref={sectionRef}>
      <div className="loss-header">
        <span className="loss-icon">&#9888;&#65039;</span>
        <div>
          <h3>Your box has ~{Math.round((overchargePerPackage / (overchargePerPackage + parseFloat(unitLabel) || 1)) * 100)}% air</h3>
          <p>You're paying to ship empty space. Here's what that costs:</p>
        </div>
      </div>

      <div className="loss-milestones">
        {milestones.map((m, i) => (
          <div key={m.label} className="loss-card">
            <span
              ref={(el) => { counterRefs.current[i] = el; }}
              className="loss-number"
            >$0</span>
            <span className="loss-label">{m.label}</span>
          </div>
        ))}
      </div>

      <div className="loss-slider">
        <label className="loss-slider-label">
          Packages per month: <strong>{packagesPerMonth}</strong>
        </label>
        <input
          type="range"
          min={10}
          max={5000}
          step={10}
          value={packagesPerMonth}
          onChange={(e) => setPackagesPerMonth(Number(e.target.value))}
          className="loss-range"
        />
        <div className="loss-range-labels">
          <span>10</span>
          <span>500</span>
          <span>1,000</span>
          <span>5,000</span>
        </div>
      </div>

      <div className="loss-cta">
        <p>This is just <strong>one SKU</strong>. If you have 10+ products with similar packaging, the annual loss could exceed <strong>${(annualLoss * 10).toLocaleString()}</strong>.</p>
      </div>
    </div>
  );
}

export default LossCalculator;
