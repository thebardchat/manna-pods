# Manna Pods — BGKPJR Cargo Architecture

> **Try Claude free for 2 weeks** — the AI behind this entire ecosystem. [Start your free trial →](https://claude.ai/referral/4fAMYN9Ing)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue)](https://thebardchat.github.io/manna-pods)
[![BGKPJR](https://img.shields.io/badge/Parent-BGKPJR%20Launch%20Vis-green)](https://github.com/thebardchat/BGKPJR-Launch-Vis)
[![Manna Research](https://img.shields.io/badge/Design%20Research-manna-orange)](https://github.com/thebardchat/manna)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

Extended cargo pod concept designs for the BGKPJR electromagnetic launch architecture. Full interactive 3D cross-section views of all operational variants and next-generation WIP concepts, built in the Manna blueprint aesthetic.

---

## The Variants

| Pod | Full Name | Cargo Class | Payload Fraction | Internal G | Lunar Cost |
|-----|-----------|-------------|-----------------|------------|-----------|
| **Manna-H** | Hardened | Propellant, food, metals | **78%** | 100 G | $54/kg |
| **Manna-I** | Isolated | Electronics, instruments | 54.8% | 5.5 G | $467/kg |
| **Manna-B** | Biological | Biologics, microbiomes | 18.6% | 2.5 G | $4,190/kg |

## WIP Concepts

| Pod | Full Name | Status | Key Innovation |
|-----|-----------|--------|---------------|
| **Manna-F** | Fuel | Trade Study | 88% payload fraction propellant tanker for Tug refueling |
| **Manna-M** | Medical | Feasibility | ISO Class 5 sterile pharmaceutical delivery |
| **Manna-X** | Experimental | Interface Study | Open payload bus — 19" rack, 200W, Ethernet during transit |
| **Manna-T** | Terrain | Architecture | 2.4m diameter surface equipment pod with airbag landing |

---

## Stack

| Tool | Purpose |
|------|---------|
| [Astro](https://astro.build) | Static site + islands architecture |
| [Svelte 5](https://svelte.dev) | Interactive islands |
| [Three.js](https://threejs.org) | 3D pod cross-section viewer |
| TypeScript | Pod spec data layer |
| GitHub Pages | Static hosting |

Design language inherited from [thebardchat/manna](https://github.com/thebardchat/manna) — Orbitron + Share Tech Mono, blueprint grid, dark space palette.

---

## Run Locally

```bash
git clone https://github.com/thebardchat/manna-pods.git
cd manna-pods
npm install
npm run dev      # http://localhost:4323
npm run build    # static output to ./dist
```

---

## Ecosystem

| Repo | Connection |
|------|------------|
| [BGKPJR-Core-Simulations](https://github.com/thebardchat/BGKPJR-Core-Simulations) | Physics — rail, Gryphon, Kepler |
| [BGKPJR-Launch-Vis](https://github.com/thebardchat/BGKPJR-Launch-Vis) | Full launch animation |
| [manna](https://github.com/thebardchat/manna) | Original Manna design research paper |
| [tug](https://github.com/thebardchat/tug) | The orbital tug that catches the pods |

---

*Built by Shane Brazelton + Claude (Anthropic). Pre-Phase A concept — all figures are calculated estimates. Apache 2.0.*
