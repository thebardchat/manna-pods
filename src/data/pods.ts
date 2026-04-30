// Manna Cargo Pod Variants
//
// Reconciled 2026-04-30 to BGKPJR canonical baseline (VacuumGate v1.0).
// All pods now share the canonical 37 km / Mach 5 / 4 G rail with the
// Gryphon (Phase 2 deferred) vehicle. Differentiation moves from "exit
// velocity / external G" (which were physics-impossible at the old
// 28.7 km baseline for the high-G variants) to "internal cushioning,
// cargo class, and recovery mode."
//
// Source of truth: BGKPJR-Core-Simulations/simulation/src/bgkpjr_dimensions.py
// Reconciliation rationale: BGKPJR-Core-Simulations/CANONICAL-BASELINE.md
// Audit: BGKPJR-Core-Simulations/expert-reviews/PRE-LUKENS-AUDIT-2026-04-30.md
//
// Mission profile (all variants):
//   Stage 1: 37 km rail, 0 → 1,700 m/s (Mach 5), 4 G external, 43.5 sec
//   Stage 2: Pod second-stage rocket, +5,970 m/s to LEO (7,670 m/s @ 400 km)
//   Stage 3: Tug catch in LEO, TLI burn (+3,150 m/s), lunar transit
//   Stage 4: Lander handoff, surface delivery; empty pod → regolith fill

export const VARIANTS = [
  {
    id: "H", name: "Manna-H", full: "Hardened", color: "#e84040",
    status: "Concept Design — VG canonical", statusClass: "red",
    tagline: "Bulk consumables, propellant, metals — 4G rail, 78% payload, no isolation",
    cargoClass: "Bulk consumables, LH₂/LOX propellant, food, structural metals, water ice",
    payloadFrac: 0.78, payloadKg: 3276, grossKg: 4200,
    internalG: 4, externalG: 4,
    exitVms: 1700, exitMach: 5,
    costLunar: 54, costLEO: 12,
    diamM: 1.8, lenM: 4.2,
    thermalShield: "PICA-X ablative nose cone, carbon-carbon leading edges",
    guidance: "None — passive ballistic, RF beacon only",
    power: "None — no active systems",
    notes: "The workhorse. Manna-H accepts the rail's full 4G external G-load directly into the cargo bay — no internal isolation, no active components. The 78% payload fraction and $54/kg lunar cost (mature ops, fleet-scale) make it the economic backbone of the BGKPJR supply chain. Fleet-scale operations assume ~70% of all Manna launches are Manna-H.",
    structureNotes: "Monocoque CFRP shell with aluminum honeycomb bulkheads. No isolation layer. Cargo secured with foam-in-place HDPE and steel webbing. Nose cone: 30 kg PICA-X ablator shed on atmospheric transit.",
    stages: [
      { label: "Rail (37 km)", g: 4, v: "1,700 m/s", dur: "43.5 s" },
      { label: "Pod 2nd-stage rocket burn", g: "0.5", v: "+5,970 m/s", dur: "~9 min" },
      { label: "Tug catch in LEO", g: "0.01", v: "<2 m/s closing", dur: "~8 min" },
      { label: "TLI burn (Tug)", g: "0.4", v: "+3,150 m/s", dur: "~8 min" },
      { label: "Lunar transit", g: 0, v: "—", dur: "~3.2 days" },
    ],
  },
  {
    id: "I", name: "Manna-I", full: "Isolated", color: "#f4a020",
    status: "Concept Design — VG canonical", statusClass: "amber",
    tagline: "Electronics, instruments, spares — passive isolation cushions 4G rail to 2.5G payload",
    cargoClass: "Electronics, scientific instruments, avionics, mechanical spares, medical kits",
    payloadFrac: 0.548, payloadKg: 2082, grossKg: 3800,
    internalG: 2.5, externalG: 4,
    exitVms: 1700, exitMach: 5,
    costLunar: 467, costLEO: 98,
    diamM: 1.8, lenM: 4.6,
    thermalShield: "Ablative TPS + carbon phenolic over isolation frame",
    guidance: "Inertial measurement unit + GPS beacon, no active propulsion",
    power: "Li-ion battery, 40 Wh, powers IMU + beacon + isolation telemetry",
    notes: "Manna-I threads the needle for electronics. The 4G external / 2.5G payload capability is achieved through a passive shock-mount isolation system: tuned-damping titanium struts isolate the inner cargo cradle from the rail's 4G impulse and the second-stage burn. Electronics rated for 5G structural margin survive cleanly with ~50% margin to spare.",
    structureNotes: "Outer CFRP monocoque rated to 4G. Inner aluminum payload cradle mounted on 12× titanium isolator struts with tuned damping (5 Hz natural frequency). Gap filled with closed-cell foam. Payload locking pins release at apogee for Tug catch.",
    stages: [
      { label: "Rail (37 km)", g: "4 ext / 2.5 payload", v: "1,700 m/s", dur: "43.5 s" },
      { label: "Pod 2nd-stage rocket burn", g: "0.5 ext / 0.3 payload", v: "+5,970 m/s", dur: "~9 min" },
      { label: "Tug catch in LEO", g: "0.01", v: "<2 m/s closing", dur: "~8 min" },
      { label: "TLI burn (Tug)", g: "0.4 ext / 0.3 payload", v: "+3,150 m/s", dur: "~8 min" },
      { label: "Lunar transit", g: 0, v: "—", dur: "~3.2 days" },
    ],
  },
  {
    id: "B", name: "Manna-B", full: "Biological", color: "#4fc3f7",
    status: "Concept Design — VG canonical", statusClass: "blue",
    tagline: "Seedlings, biologics, microbiomes — double-cushioned to 1.2G payload, full life support",
    cargoClass: "Seedlings, microbiomes, cell cultures, pharmaceuticals, blood products, small fauna",
    payloadFrac: 0.186, payloadKg: 595, grossKg: 3200,
    internalG: 1.2, externalG: 4,
    exitVms: 1700, exitMach: 5,
    costLunar: 4190, costLEO: 880,
    diamM: 1.8, lenM: 5.1,
    thermalShield: "MLI blanket + active thermal control loop (±0.5°C internal)",
    guidance: "Full 6-DOF GNC + attitude control thrusters for thermal pointing",
    power: "Li-ion 280 Wh + thin-film solar for transit power, TCS active control",
    notes: "Manna-B uses double-stage isolation: an outer Manna-I-class isolation frame plus an inner liquid-suspension capsule that decouples payload from all structural vibrations. Active thermal control maintains any temperature between -20 °C and +37 °C throughout the 3.2-day lunar transit. The high cost per kg is justified only by cargo with no alternative — living systems that must arrive alive.",
    structureNotes: "Outer structure same as Manna-I. Inner capsule: 304 stainless pressure vessel with fluoropolymer liner. Payload suspended in temperature-controlled liquid suspension medium. Hermetic seals rated to 5 bar. Sterile fill and seal in ISO Class 5 cleanroom.",
    stages: [
      { label: "Rail (37 km)", g: "4 ext / 1.2 payload", v: "1,700 m/s", dur: "43.5 s" },
      { label: "Pod 2nd-stage rocket burn", g: "0.5 ext / 0.15 payload", v: "+5,970 m/s", dur: "~9 min" },
      { label: "Tug catch in LEO", g: "0.01", v: "<1.5 m/s closing", dur: "~10 min" },
      { label: "TLI burn (Tug)", g: "0.4 ext / 0.12 payload", v: "+3,150 m/s", dur: "~8 min" },
      { label: "Lunar transit (active TCS)", g: 0, v: "—", dur: "~3.2 days" },
    ],
  },
] as const;

export const WIP_CONCEPTS = [
  {
    id: "F", name: "Manna-F", full: "Fuel", color: "#b4ff6e", status: "WIP — Trade Study",
    tagline: "Dedicated propellant tanker for Tug refueling in LEO",
    vision: "The Tug's sustainability depends on affordable propellant in orbit. Manna-F is a single-purpose propellant pod — maximum tank volume, minimum everything else. At 88% payload fraction and $12/kg to LEO (Manna-H cost basis), it enables Tug economics that make lunar transit viable at scale. Long-term: replaced by ISRU-sourced lunar water boosted up by lunar-surface MAV.",
    keyParams: [
      ["Payload fraction", "88%"],
      ["G-tolerance", "4 G (canonical rail, no isolation needed)"],
      ["Propellants", "LH₂/LOX (Tug primary) or MMH/NTO (storables, TBD)"],
      ["Tank config", "Cylindrical pressure vessel, foam-insulated"],
      ["Exit velocity", "1,700 m/s (canonical 37 km rail)"],
      ["Status", "Propellant selection trade ongoing"],
    ],
    openQuestions: [
      "LH₂ boil-off during ~3 hr LEO loiter before Tug rendezvous — passive insulation sufficient?",
      "Tank material: Al-Li 2195 vs. composite overwrap pressure vessel?",
      "Propellant delivery interface: dry-break coupling or bladder transfer?",
      "Minimum viable Tug propellant reserve to justify Manna-F launch cadence",
    ],
  },
  {
    id: "M", name: "Manna-M", full: "Medical", color: "#d0a0ff", status: "WIP — Feasibility",
    tagline: "Pharmaceutical-grade sterile medical supply pod — extends Manna-B to ISO Class 5",
    vision: "A sustained lunar crew beyond 30 days needs surgical capability, blood products, and sterile pharmaceuticals. Manna-B carries biologics but cannot guarantee ISO Class 5 sterility. Manna-M extends the inner capsule to a full pharmaceutical cleanroom standard — Class 100 equivalent, verified by particle counters before seal.",
    keyParams: [
      ["Payload fraction", "~22%"],
      ["Internal G-load", "1.5 G (Manna-B-class isolation)"],
      ["Sterility class", "ISO Class 5 / USP Class 100"],
      ["Temp control", "2 °C – 8 °C (blood/pharma) or custom"],
      ["Sterile fill", "ISO 7 cleanroom fill + terminal seal"],
      ["Status", "Cleanroom interface definition in progress"],
    ],
    openQuestions: [
      "Sterility maintenance over 3.2-day transit — HEPA recirculation or hermetic seal only?",
      "Impact on cost: cleanroom prep adds ~$80 k/mission at scale",
      "Compatibility with Manna-B outer structure (shared tooling)?",
      "Blood product transit validation — spin vs. static orientation?",
    ],
  },
  {
    id: "X", name: "Manna-X", full: "Experimental", color: "#ff88cc", status: "WIP — Interface Study",
    tagline: "Open payload bus — standardized rack, 200 W regulated power, Ethernet during transit",
    vision: "University teams and research groups can't afford dedicated launch. Manna-X is the answer: a standardized 19-inch rack payload bus where the only interface document is a 1-page ICD. Power, data, thermal, and structural interfaces are all standard. Research cadence goes from years to months.",
    keyParams: [
      ["Payload fraction", "~40%"],
      ["Internal G-load", "3 G (light passive isolation)"],
      ["Rack standard", "19-inch EIA-310 compatible"],
      ["Power", "200 W regulated (28 V DC)"],
      ["Data", "100BaseT Ethernet to ground until LEO"],
      ["Slot count", "4U per launch (shared or dedicated)"],
    ],
    openQuestions: [
      "Data link: Ethernet duration limited during atmospheric transit — sufficient?",
      "Power source: battery stack size vs. mass fraction trade",
      "Slot pricing model: per-kg or per-U-slot?",
      "Vibration isolation standard for 3 G — passive mounts or active?",
    ],
  },
  {
    id: "T", name: "Manna-T", full: "Terrain", color: "#ffcc44", status: "WIP — Architecture",
    tagline: "Pre-positioned surface equipment — habitat components, regolith printers, solar arrays",
    vision: "You can't bootstrap a lunar base if every piece of infrastructure costs $1M/kg to deliver. Manna-T is purpose-built for flat-packed deployables. With the canonical 4G rail (vs. the old 100G hardened spec), Manna-T can carry sensitive deployables that previously required Manna-I-class isolation. Empty pods become regolith-filled radiation-proof base structures (Phase 4 'Space LEGO' concept).",
    keyParams: [
      ["Payload fraction", "~55%"],
      ["Outer diameter", "2.4 m (widened rail required)"],
      ["Internal G-load", "4 G (canonical, no isolation)"],
      ["Landing mode", "Tug-delivered + airbag hard-landing dual-mode"],
      ["Payload config", "NATO 463L pallet footprint (2.24 × 2.74 m folded)"],
      ["End-of-life", "Regolith-filled radiation-proof base structure"],
      ["Status", "Widened rail architecture trade ongoing"],
    ],
    openQuestions: [
      "Widened rail: 2.4m clearance requires structural redesign — separate track or same tube?",
      "Airbag landing: 4G decel over 1m — survivable for solar panels and printers?",
      "Thermal: unpowered for 3.2-day transit, -270 °C space vs. direct sun swings",
      "First mission priority: ISRU drill + regolith collector OR solar array kit?",
    ],
  },
] as const;

export type Variant = typeof VARIANTS[number];
export type WipConcept = typeof WIP_CONCEPTS[number];
