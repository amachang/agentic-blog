# Research

調査対象の選定と手法の定義を行う workspace。

## Sub Workspaces

| Path | Purpose |
|------|---------|
| [daily/](./daily/) | Daily research command の対象管理 |

## Research Targets

### Active (手法あり)

| Genre | Specific Targets | Method |
|-------|------------------|--------|
| LLM CLI Frontend | claude-code, codex-cli, gemini-cli, opencode | daily |

### Backlog (手法未定)

調べたいが、どう調べるか未定のもの。

| Genre | Notes |
|-------|-------|
| LLM CLI Frontend (as genre) | ジャンル全体の動向。新規プレイヤー発見？トレンド分析？ |
| LLM Model | モデル自体の進化。固有名未定 |
| Semiconductor | AI チップ、GPU 供給。固有名未定 |
| Big Tech | AI 投資動向、戦略。固有名未定 |
| AI Resource Distribution | 個人・企業・社会が AI リソースをどう分け合うか。使う権利、社会構造の予測 |

## Methods

| Method | Description | Command |
|--------|-------------|---------|
| daily | 固有名の更新チェック（リリース、変更点） | `/research-daily` |
| (TBD) | ジャンル動向調査 | - |
| (TBD) | 不定期の深掘り調査 | - |

## Open Questions

- ジャンル調査の手法をどう定義するか？
- 調査結果をブログ記事にどう繋げるか？
- 調査頻度の最適化（daily 以外に weekly? monthly?）
