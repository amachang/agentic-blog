import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  fetchDailyPapers,
  type DailyPaper,
} from '../../../lib/huggingface/daily-papers.js';

const mockApiResponse = [
  {
    paper: {
      id: '2412.00001',
      title: 'Test Paper on Machine Learning',
      summary: 'This paper explores new techniques in ML.',
      authors: [{ name: 'Alice' }, { name: 'Bob' }],
      publishedAt: '2024-12-01',
      upvotes: 50,
    },
  },
  {
    paper: {
      id: '2412.00002',
      title: 'Another AI Research Paper',
      summary: 'Advances in neural networks.',
      authors: [{ name: 'Charlie' }],
      publishedAt: '2024-12-01',
      upvotes: 30,
    },
  },
  {
    paper: {
      id: '2412.00003',
      title: 'Low Upvote Paper',
      summary: 'Some content here.',
      authors: [{ name: 'Dave' }],
      publishedAt: '2024-12-01',
      upvotes: 5,
    },
  },
];

describe('fetchDailyPapers', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockApiResponse),
        })
      )
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetches and parses papers correctly', async () => {
    const papers = await fetchDailyPapers();

    expect(papers).toHaveLength(3);
    expect(papers[0]).toMatchObject({
      title: 'Test Paper on Machine Learning',
      authors: ['Alice', 'Bob'],
      abstract: 'This paper explores new techniques in ML.',
      arxivUrl: 'https://arxiv.org/abs/2412.00001',
      upvotes: 50,
    });
  });

  it('sorts papers by upvotes descending', async () => {
    const papers = await fetchDailyPapers();

    expect(papers[0].upvotes).toBe(50);
    expect(papers[1].upvotes).toBe(30);
    expect(papers[2].upvotes).toBe(5);
  });

  it('filters by minUpvotes', async () => {
    const papers = await fetchDailyPapers({ minUpvotes: 20 });

    expect(papers).toHaveLength(2);
    expect(papers.every((p: DailyPaper) => p.upvotes >= 20)).toBe(true);
  });

  it('filters by keywords', async () => {
    const papers = await fetchDailyPapers({ keywords: ['Machine Learning'] });

    expect(papers).toHaveLength(1);
    expect(papers[0].title).toBe('Test Paper on Machine Learning');
  });

  it('filters by multiple keywords (OR logic)', async () => {
    const papers = await fetchDailyPapers({ keywords: ['neural', 'Machine'] });

    expect(papers).toHaveLength(2);
  });

  it('throws error on failed fetch', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
        })
      )
    );

    await expect(fetchDailyPapers()).rejects.toThrow(
      'Failed to fetch daily papers: 500 Internal Server Error'
    );
  });
});
