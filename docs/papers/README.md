# Papers Workspace

Tracking AI/ML research papers from various sources.

## Status

- **Last sync**: 2025-12-07
- **Papers in last sync**: 20

## Sources

- Hugging Face Daily Papers (daily/YYYYMMDD-summary.md)

## Usage

Sync daily papers via prompt:

```typescript
import { syncDailyPapers } from '@tools/papers/sync';
await syncDailyPapers({ minUpvotes: 10 });
```
