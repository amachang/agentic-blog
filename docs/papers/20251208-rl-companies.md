# RL Companies Research - 2025-12-08

> Study結論に基づくRL企業リサーチ。3つのAIエージェントによる並列調査結果を統合。

## Target Criteria

### Domain Characteristics:
- **Hard to digitize** - 正解ラベルが作れない領域
- **Preference-dependent but with statistical trends** - 好みに依存するが統計的傾向がある

### Company Strengths:
- **Unique reward design** - 独自の報酬設計
- **Efficient exploration** - 効率的な探索
- **Domain expertise** - 特定ドメインの専門性

---

## Top Companies by Category

### 1. Robotics & Physical AI

| Company | Country | RL Application | Key Strength |
|---------|---------|----------------|--------------|
| **Covariant** | USA | Warehouse picking (fleet learning) | Domain expertise (acquired by Amazon 2024) |
| **Physical Intelligence** | USA | General manipulation (RECAP) | Reward design ($5.6B valuation) |
| **Wayve** | UK | End-to-end driving | Efficient exploration (foundation model) |
| **Waabi** | Canada | Autonomous trucking | Efficient exploration (generative sim) |
| **Unitree** | China | Quadruped/humanoid locomotion | Domain expertise (low-cost hardware) |
| **Boston Dynamics** | USA | Humanoid robotics | Domain expertise (30+ years) |

**Why RL fits**: Physical manipulation/locomotion is hard to label exhaustively. Success criteria involve subjective quality dimensions.

---

### 2. Drug Discovery & Molecular Design

| Company | Country | RL Application | Key Strength |
|---------|---------|----------------|--------------|
| **Insilico Medicine** | HK/Cyprus | GENTRL for molecule generation | Reward design (multi-objective: potency, ADMET) |
| **Isomorphic Labs** | UK | Digital biology (AlphaFold3) | Efficient exploration (DeepMind compute) |
| **Recursion** | USA | Phenotypic screening | Domain expertise (65PB biological data) |
| **Exscientia** | UK | Lead optimization | Reward design (expert preferences) |
| **Iktos** | France | Medicinal chemistry | Domain expertise (pharma partnerships) |

**Why RL fits**: Molecular interactions are computationally intractable. Drug quality involves competing objectives (efficacy, safety, synthesis).

---

### 3. Game AI & Entertainment

| Company | Country | RL Application | Key Strength |
|---------|---------|----------------|--------------|
| **Sony AI** | Japan | Gran Turismo Sophy | Reward design (speed + sportsmanship) |
| **DeepMind** | UK | AlphaStar, AlphaGo | Efficient exploration (massive self-play) |
| **rct AI** | USA/China | NPC behavior (Chaos Box) | Domain expertise (emergent narrative) |
| **Modl.ai** | Denmark | Game testing bots | Efficient exploration (QA automation) |

**Why RL fits**: Strategic intuition cannot be captured in rules. Playing style has subjective quality dimensions.

---

### 4. Autonomous Vehicles

| Company | Country | RL Application | Key Strength |
|---------|---------|----------------|--------------|
| **Waymo** | USA | Behavior planning | Domain expertise (71M+ rider miles) |
| **Tesla** | USA | Vision-only FSD | Efficient exploration (fleet learning) |
| **Nuro** | USA | Delivery robot planning | Domain expertise |

**Why RL fits**: Edge cases are impossible to enumerate. Driving comfort is subjective.

---

### 5. Finance & Trading

| Company | Country | RL Application | Key Strength |
|---------|---------|----------------|--------------|
| **Qraft Technologies** | Korea | AI ETF allocation | Domain expertise (NYSE-listed ETFs) |
| **JPMorgan** | USA | LOXM trade execution | Reward design (fill price/impact) |
| **Two Sigma** | USA | Portfolio optimization | Efficient exploration (backtesting) |
| **Man AHL** | UK | Order execution | Domain expertise |

**Why RL fits**: Market dynamics resist labeling. Risk tolerance is preference-dependent.

---

### 6. Industrial Process Control

| Company | Country | RL Application | Key Strength |
|---------|---------|----------------|--------------|
| **Imubit** | USA | Refinery optimization | Reward design (multi-objective) |
| **Yokogawa** | Japan | FKDPP chemical plant control | Domain expertise (35 days autonomous) |
| **Siemens** | Germany | Industrial automation | Domain expertise (PLC/SCADA integration) |
| **MakinaRocks** | Korea | Semiconductor manufacturing | Domain expertise |
| **DeepMind** | UK | Data center cooling | Efficient exploration (30% energy reduction) |

**Why RL fits**: Complex chemical/manufacturing processes have billions of states. Optimization involves competing objectives.

---

### 7. Recommendation Systems

| Company | Country | RL Application | Key Strength |
|---------|---------|----------------|--------------|
| **ByteDance** | China | TikTok feed ranking | Efficient exploration (massive scale) |
| **Netflix** | USA | Content recommendation | Reward design (long-term retention) |
| **Alibaba** | China | E-commerce search/ads | Domain expertise (multi-agent RL) |
| **Meta** | USA | Notifications (Horizon) | Efficient exploration |

**Why RL fits**: User preferences are latent and evolving. Engagement is fundamentally subjective.

---

### 8. Creative AI

| Company | Country | RL Application | Key Strength |
|---------|---------|----------------|--------------|
| **DeepMind** | UK | MusicRL/Magenta | Reward design (RLHF for audio) |
| **OpenAI** | USA | RLHF for generation | Reward design (aesthetic preferences) |
| **Adobe** | USA | Design layout | Domain expertise (Creative Cloud) |
| **Splash** | Australia | Interactive music | Domain expertise (game integration) |

**Why RL fits**: Musical/visual quality cannot be labeled objectively. Aesthetics are preference-dependent.

---

### 9. Healthcare (Emerging)

| Company | Country | RL Application | Key Strength |
|---------|---------|----------------|--------------|
| **Caption Health** | USA | Ultrasound guidance | Domain expertise (FDA-cleared) |
| **Biomonadic** | - | Gene therapy manufacturing | Reward design (CPP optimization) |

**Why RL fits**: Treatment success involves patient preferences. Clinical outcome rewards are complex.

---

## Key Patterns

### 1. Fleet Learning Advantage
Covariant, Tesla, OSARO leverage deployed systems for continuous improvement.
→ Data moat from real-world deployment.

### 2. Simulation-to-Real Transfer
Boston Dynamics, Waymo, Imubit train in simulation before physical deployment.
→ Safe exploration without real-world cost.

### 3. Multi-Objective Reward Design
Drug discovery and process optimization companies excel at balancing competing objectives.
→ Domain knowledge embedded in reward function.

### 4. Hybrid Approaches
Most successful companies combine RL with supervised learning, foundation models, and physics-based simulation.
→ RL as enhancement, not replacement.

---

## Regional Strengths

| Region | Focus Area |
|--------|------------|
| **USA** | Robotics, Bio-tech, Generative AI |
| **UK** | Core RL research (DeepMind, Wayve) |
| **China** | Recommendation, Robotics hardware |
| **Japan** | Industrial automation (Yokogawa) |
| **Korea** | Finance (Qraft), Manufacturing (MakinaRocks) |
| **Israel** | FinTech, Personalization |

---

## Investment Thesis Validation

Today's study conclusion holds:
1. **RL is differentiator in hard-to-digitize domains** ✓ (Robotics, Drug Discovery)
2. **Unique reward design is key** ✓ (Insilico, Sony AI, Imubit)
3. **Domain expertise matters** ✓ (Yokogawa 35-day autonomous, Recursion 65PB data)
4. **Watch for "RL washing"** ✓ (Some companies use RL as marketing but core is supervised)

### Warning Signs:
- "RL" in marketing but no technical papers
- No deployed real-world RL systems
- Generic "AI" without domain-specific reward engineering
