# Daily Research

`/research-daily` command の対象管理。

## Targets

各パスは workspace で、README.md の "Daily Research" セクションに調査指示がある。

```
docs/papers
docs/llm-cli-frontends/claude-code
docs/llm-cli-frontends/codex-cli
docs/llm-cli-frontends/gemini-cli
docs/llm-cli-frontends/opencode
```

## Contract

Each target workspace must have a `## Daily Research` section with:
- **Check**: URL or source to check
- **Look for**: What to look for
- **Last known**: Most recent state

The `/research-daily` command reads this section and logs results to `YYYYMMDD-summary.md`.

## Adding New Targets

1. 対象の workspace を作成（README.md に基本情報）
2. 上記リストにパスを追加
3. `/research-daily` 実行時に "Daily Research" セクションが自動生成される
