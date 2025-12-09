# ARM-Thinker と RL トレンド - 学習メモ (2025-12-09)

> 前提知識: 昨日の RL 基礎（REINFORCE, PPO, DPO, GRPO）は理解済み。

## 背景

今日の論文 50 本中、RL 関連が目立った。特に ARM-Thinker を深掘りした。

---

## ARM-Thinker とは

**A**gentic **R**eward **M**odel - ツールを使える報酬モデル。

### 従来の RM の問題

```
ユーザー: 「画像の左上にある数字は？」
モデル回答: 「42」

従来の RM: 画像全体をぼんやり見て判定 → hallucination を見逃す
```

- **Hallucination に弱い**: 細部を検証できない
- **Visual grounding が曖昧**: どこを見て判断したか不明
- **検証手段がない**: 静的なスコアリングのみ

### ARM-Thinker の解決策

**ツールで検証してから報酬を出す**:

```
1. 「左上を確認したい」→ image cropping ツール呼び出し
2. クロップ画像を精査 →「24」と認識
3. モデル回答「42」と比較 → 不一致検出
4. 根拠付きで低スコア
```

使用ツール例:
- Image cropping: 特定領域の拡大検証
- Doc page retrieval: 複数ページの cross-reference
- Text verification: 推論ステップの論理検証

### 技術的ポイント

- Multi-stage RL で学習
- Tool-calling の判断と judgment accuracy を同時最適化

### 結果

| Benchmark | 改善 |
|-----------|------|
| Reward Modeling | +16.2% |
| Tool-use tasks | +9.6% |

---

## 新しい概念: Factual Grounding

**「事実に根拠づける」こと。**

| 状態 | 説明 |
|------|------|
| Grounding なし | 根拠なく「それっぽいこと」を生成 |
| Grounding あり | 検証可能な事実に紐づいた生成 |

語源: Ground = 地面。「地に足をつけた」主張。

関連用語:
- **Visual Grounding**: 画像のどこを見て判断したか示せる
- **RAG**: Retrieval-Augmented Generation（検索で grounding）

---

## なぜ今 RL 論文が多いのか

### 1. Pre-training のスケーリング限界

```
2020-2023: データとパラメータを増やせば賢くなる
2024-2025: データ枯渇、コスト限界、収穫逓減
```

次の伸びしろは **post-training**。

### 2. Pre-training vs Post-training

```
Pre-training:
  大量テキストで「次の単語予測」を学習
  → Base Model ができる（数ヶ月、数億ドル）

Post-training:
  Base Model を調整して使いやすく/賢くする
  → Chat Model になる（数日〜数週間）

  手法:
  - SFT: 正解データで追加学習
  - RL: 報酬で行動を最適化
```

### 3. DeepSeek-R1 / OpenAI o1 の衝撃

| Before | After |
|--------|-------|
| RL = alignment 用 | RL = **能力向上**にも使える |
| CoT は SFT で教える | CoT は **RL で自己発見**させる |

### 4. コスト構造の変化

```
Pre-training: 数億ドル、巨大クラスタ必要
Post-training: 数百万ドル、中規模で可能
```

**大手も post-training で成功 + 予算的に誰でもアイデア勝負できる**

---

## ARM-Thinker の位置づけ

### Scalable Oversight の文脈

> 「人間より賢いモデルをどう監督するか？」

ARM-Thinker は「人間 + ツール」で監督能力を拡張するアプローチ。

### 関連概念

| 用語 | 意味 |
|------|------|
| **Scalable Oversight** | 人間の監督能力をスケールさせる研究領域 |
| **Tool-Augmented Alignment** | ツールで alignment を強化（ARM-Thinker） |
| **AI-Assisted Evaluation** | AI が AI を評価（Constitutional AI 等） |

### 「Tool + 人間 → 人間超え」の可能性

```
人間単独の判断 → RM → LLM学習
= 人間の限界がモデルの天井

人間 + ツール検証 → RM → LLM学習
= より正確な報酬 → 天井が上がる？
```

ただし現状は:
- **事実の正誤**: ツールで検証可能 ○
- **価値判断・好み**: まだ人間依存 △

---

## 今日の Study 結論

論文を毎日 research する体制にしてから RL 関連のアイデア系論文が多いことに気づく。

### なぜ RL 論文が多いか（仮説）

1. **報酬設計でアイデアが形になる**: ARM-Thinker のようなエージェント導入も容易
2. **大手も post-training で成功**: DeepSeek-R1, o1
3. **予算的にアクセスしやすい**: アイデア勝負できる領域

### 昨日との接続

昨日学んだ RL 基礎（PPO, GRPO など）が、今日の ARM-Thinker で「報酬モデル自体を改善する」方向に発展。

```
昨日: RL の手法（どう学習するか）
今日: RM の改善（何を報酬にするか）
```

報酬設計の創意工夫が論文になる時代。

---

## 残った疑問・次に調べること

- Constitutional AI の詳細（AI が AI を評価）
- Scalable Oversight の他のアプローチ
- 今日の他の RL 論文（CAPO, Entropy Ratio Clipping）の詳細
