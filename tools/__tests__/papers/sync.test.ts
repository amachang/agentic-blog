import { describe, it, expect } from 'vitest';
import {
  formatDate,
  formatDateDisplay,
  formatAuthors,
  renderSummary,
} from '../../papers/sync.js';
import type { DailyPaper } from '../../lib/huggingface/daily-papers.js';

describe('formatDate', () => {
  it('formats date as YYYYMMDD', () => {
    const date = new Date('2024-12-07');
    expect(formatDate(date)).toBe('20241207');
  });

  it('pads single-digit months and days', () => {
    const date = new Date('2024-01-05');
    expect(formatDate(date)).toBe('20240105');
  });
});

describe('formatDateDisplay', () => {
  it('converts YYYYMMDD to YYYY-MM-DD', () => {
    expect(formatDateDisplay('20241207')).toBe('2024-12-07');
  });
});

describe('formatAuthors', () => {
  it('joins up to 3 authors', () => {
    expect(formatAuthors(['Alice', 'Bob', 'Charlie'])).toBe(
      'Alice, Bob, Charlie'
    );
  });

  it('adds et al. for more than 3 authors', () => {
    expect(formatAuthors(['Alice', 'Bob', 'Charlie', 'Dave'])).toBe(
      'Alice, Bob, Charlie, et al.'
    );
  });

  it('handles single author', () => {
    expect(formatAuthors(['Alice'])).toBe('Alice');
  });

  it('handles empty array', () => {
    expect(formatAuthors([])).toBe('');
  });
});

describe('renderSummary', () => {
  const mockPapers: DailyPaper[] = [
    {
      title: 'Test Paper',
      authors: ['Alice', 'Bob'],
      abstract: 'This is a test abstract.',
      arxivUrl: 'https://arxiv.org/abs/2412.00001',
      upvotes: 42,
      publishedAt: '2024-12-07',
    },
  ];

  it('renders summary with correct header', () => {
    const result = renderSummary(mockPapers, '20241207');

    expect(result).toContain('# Daily Papers Summary - 2024-12-07');
    expect(result).toContain('**Total papers**: 1');
  });

  it('renders paper entries', () => {
    const result = renderSummary(mockPapers, '20241207');

    expect(result).toContain('## 1. Test Paper');
    expect(result).toContain('**Authors**: Alice, Bob');
    expect(result).toContain('**Upvotes**: 42');
    expect(result).toContain('**Link**: https://arxiv.org/abs/2412.00001');
    expect(result).toContain('This is a test abstract.');
  });

  it('handles multiple papers with separators', () => {
    const twoPapers: DailyPaper[] = [
      ...mockPapers,
      {
        title: 'Second Paper',
        authors: ['Charlie'],
        abstract: 'Another abstract.',
        arxivUrl: 'https://arxiv.org/abs/2412.00002',
        upvotes: 10,
        publishedAt: '2024-12-07',
      },
    ];

    const result = renderSummary(twoPapers, '20241207');

    expect(result).toContain('## 1. Test Paper');
    expect(result).toContain('## 2. Second Paper');
    expect(result).toContain('**Total papers**: 2');
  });
});
