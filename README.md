# 🌾 KisanBandhan AI (किशनबंधन) — Technical Approach (PPT Slide)

---

## 1️⃣ Left Side Table (PPT टेबल में लिखने के लिए)

| Category | Technologies | Purpose |
| :--- | :--- | :--- |
| **Backend** | Node.js + Express / Next.js APIs | JavaScript framework for RESTful APIs and serverless endpoints |
| **Database** | Supabase (PostgreSQL + pgvector) | Scalable relational & vector database for AI embeddings, crop matching, and transaction ledger |
| **AI Models** | **Scikit-learn + OpenCV (CV) + OSRM** | Multi-modal AI suite: Scikit-learn for demand forecasting, Computer Vision for FSSAI grading, and OSRM for route optimization |
| **Frontend** | React.js + Next.js + Tailwind CSS | Dynamic user interface with HTML structure, Tailwind styling, and 6 role dashboards |
| **Language Support** | KisanBandhan Native i18n | Real-time translation for Devanagari Hindi and regional language support |
| **Rural Access** | IVR Telephony (1800-KISAN-AI) | Feature-phone telephony allowing non-smartphone farmers to sell crops via phone keypad |
| **Deployment** | Vercel + Node.js | Containerization and cloud hosting for national Mandi scalability |

---

## 2️⃣ Right Side Flowchart (PPT के दायें तरफ वाले डिब्बों / Boxes में लिखने के लिए)

```
┌────────────────────────────────────────────────────────────────────────┐
│  👤 User Access (Farmers / Buyers / FPOs)                               │
│  Entry point for 6 personas to interact with direct agriculture system │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│  💻 React.js + Next.js + Tailwind CSS                                  │
│  Dynamic user interface with Devanagari Hindi & live Mandi ticker      │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│  ⚡ Node.js (Next.js API Routes)                                       │
│  Backend API layer processing direct contracts and AI model requests   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│  🗄️ Supabase (PostgreSQL + pgvector Vector DB)                         │
│  Database for storing crop embeddings, direct contracts, and ledger    │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│  🤖 Multi-Modal AI Suite (Scikit-learn + OpenCV + OSRM)                │
│  Scikit-learn for demand forecasting, OpenCV for CV quality grading,    │
│  and OSRM for multi-stop fuel route optimization                      │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│  ☎️ IVR Telephony & Vernacular i18n Engine                           │
│  Provides 1800-KISAN-AI phone keypad service & real-time Hindi support │
└────────────────────────────────────────────────────────────────────────┘
```
