<div align="center">
  <h1>
    <img src="public/assets/logo.png" alt="Reven Markets Logo" width="40" vertical-align="middle" />
    Reven Markets
  </h1>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Rust-2024-000000?style=for-the-badge&logo=rust&logoColor=white" alt="Rust" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</div>

<br />

<!-- Video Section -->
<div align="center">
  <video src="https://github.com/user-attachments/assets/28177a24-b751-447b-b432-bd5d41acc215" width="100%" controls muted autoplay loop>
    Your browser does not support the video tag.
  </video>
</div>


<br />

Reven Markets is a unified, professional-grade trading terminal for prediction markets, supporting both Polymarket and Kalshi ecosystems. It delivers a high-fidelity interface for real-time order book analysis, automated strategy management, and private transfers.

> [!NOTE]
> **Project Status**: Reven is currently in Early Access development. Core modules are being actively refined, and certain dashboards may utilize simulated data feeds for preview purposes. V1 production release is pending.

---

### Core Modules

The terminal is partitioned into specialized high-throughput modules designed for professional traders.

| Module | Purpose | Status |
| :--- | :--- | :--- |
| **Market Aggregator** | Unified position management across cross-platform categories | Active |
| **Arbitrage Finder** | Real-time delta tracking between market tokens and events | Active |
| **Automated Bots** | Low-latency execution engine for custom trading scripts | Beta |
| **Advanced Charting** | Technical analysis via high-performance charting primitives | Active |
| **Private Portfolio** | Anonymized wallet tracking and private transfer interfaces | Development |

---

### Technical Implementation

#### Frontend Architecture
Built on **Next.js 16** with React 19, the frontend prioritizes low-latency UI updates and type-safe state management.
- **Data Synchronization**: Server-Sent Events (SSE) for sub-second order book and price updates.
- **Web3 Integration**: Viem-powered blockchain interactions for seamless wallet connectivity.
- **Visualization**: High-performance financial visualization using Lightweight Charts.

#### Backend Architecture
The backend is a high-concurrency **Rust** service built on the Axum framework, optimized for data proxying and WebSocket orchestration.
- **Polyoxide SDK**: Deep integration with Polymarket’s CLOB and Gamma APIs.
- **Async Runtime**: Powered by Tokio for non-blocking I/O and concurrent stream handling.
- **Safety**: Strict memory safety and type enforcement for financial data processing.

---

### Development Setup

#### 1. Backend Service
Requires Rust toolchain (v1.75+).
```bash
cd backend
cargo run --release
```
*Listens on port 8080 by default.*

#### 2. Frontend Application
Requires Node.js 20+.
```bash
npm install
npm run dev
```
*Access via http://localhost:3000.*

---

### Environment Configuration

Copy `.env.example` to `.env.local` and configure the following:
- `NEXT_PUBLIC_API_URL`: Your backend endpoint.
- `POLYMARKET_API_KEY`: Required for advanced trading features.
- `KALSHI_API_CONFIG`: Integration parameters for Kalshi markets.

---

### Repository Structure

```text
├── backend/            # Rust concurrency layer & API proxy
├── src/
│   ├── app/            # Next.js App Router (Layouts & Routes)
│   ├── components/     # UI primitives & market modules
│   ├── hooks/          # Real-time data & state hooks
│   └── lib/            # Shared utilities & API clients
└── public/             # Static assets & brand identity
```

