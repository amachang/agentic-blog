/**
 * Hugging Face Daily Papers API Client
 *
 * Fetches and parses papers from the Hugging Face daily_papers endpoint.
 */

const DAILY_PAPERS_API = 'https://huggingface.co/api/daily_papers';

export interface DailyPaper {
  title: string;
  authors: string[];
  abstract: string;
  arxivUrl: string;
  upvotes: number;
  publishedAt: string;
}

interface ApiPaperResponse {
  paper: {
    id: string;
    title: string;
    summary: string;
    authors: Array<{ name: string }>;
    publishedAt: string;
    upvotes: number;
  };
}

export interface FetchOptions {
  minUpvotes?: number;
  keywords?: string[];
}

function matchesKeywords(paper: DailyPaper, keywords: string[]): boolean {
  if (keywords.length === 0) return true;

  const searchText = `${paper.title} ${paper.abstract}`.toLowerCase();
  return keywords.some((keyword) => searchText.includes(keyword.toLowerCase()));
}

export async function fetchDailyPapers(
  options: FetchOptions = {}
): Promise<DailyPaper[]> {
  const response = await fetch(DAILY_PAPERS_API);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch daily papers: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as ApiPaperResponse[];

  const papers: DailyPaper[] = data.map((item) => ({
    title: item.paper.title,
    authors: item.paper.authors.map((a) => a.name),
    abstract: item.paper.summary,
    arxivUrl: `https://arxiv.org/abs/${item.paper.id}`,
    upvotes: item.paper.upvotes,
    publishedAt: item.paper.publishedAt,
  }));

  // Sort by upvotes descending
  papers.sort((a, b) => b.upvotes - a.upvotes);

  // Apply filters
  const minUpvotes = options.minUpvotes ?? 0;
  const keywords = options.keywords ?? [];

  return papers.filter(
    (paper) => paper.upvotes >= minUpvotes && matchesKeywords(paper, keywords)
  );
}
