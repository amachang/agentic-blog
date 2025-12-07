/**
 * Daily Papers Sync Tool
 *
 * Fetches daily papers from Hugging Face and writes summaries to docs/papers.
 * This tool is designed to be invoked from prompts, not as a CLI entrypoint.
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import Handlebars from 'handlebars';
import {
  fetchDailyPapers,
  type FetchOptions,
  type DailyPaper,
} from '../lib/huggingface/daily-papers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, '../templates/papers');

const DOCS_PAPERS_DIR = 'docs/papers';
const DAILY_DIR = `${DOCS_PAPERS_DIR}/daily`;

// Register helpers
Handlebars.registerHelper('inc', (value: number) => value + 1);
Handlebars.registerHelper('formatAuthors', (authors: string[]) =>
  formatAuthors(authors)
);

// Load and register partials
const paperEntryTemplate = await fs.readFile(
  path.join(TEMPLATES_DIR, 'paper-entry.hbs'),
  'utf-8'
);
Handlebars.registerPartial('paperEntry', paperEntryTemplate);

// Compile templates
const summaryTemplateSource = await fs.readFile(
  path.join(TEMPLATES_DIR, 'summary.hbs'),
  'utf-8'
);
const summaryTemplate = Handlebars.compile(summaryTemplateSource);

const readmeTemplateSource = await fs.readFile(
  path.join(TEMPLATES_DIR, 'readme.hbs'),
  'utf-8'
);
const readmeTemplate = Handlebars.compile(readmeTemplateSource);

export interface SyncOptions extends FetchOptions {
  date?: string; // YYYYMMDD format, defaults to today
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

export function formatDateDisplay(dateStr: string): string {
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
}

export function formatAuthors(authors: string[]): string {
  const authorsStr = authors.slice(0, 3).join(', ');
  return authors.length > 3 ? `${authorsStr}, et al.` : authorsStr;
}

export function renderSummary(papers: DailyPaper[], dateStr: string): string {
  return summaryTemplate({
    papers,
    papersCount: papers.length,
    formattedDate: formatDateDisplay(dateStr),
  });
}

export function renderReadme(papersCount: number, dateStr: string): string {
  return readmeTemplate({
    papersCount,
    formattedDate: formatDateDisplay(dateStr),
  });
}

export interface SyncResult {
  papersCount: number;
  outputPath: string;
}

export async function syncDailyPapers(
  options: SyncOptions = {}
): Promise<SyncResult> {
  const dateStr = options.date ?? formatDate(new Date());

  // Fetch papers
  const papers = await fetchDailyPapers({
    minUpvotes: options.minUpvotes,
    keywords: options.keywords,
  });

  // Ensure output directory exists
  await fs.mkdir(DAILY_DIR, { recursive: true });

  // Generate and write summary
  const content = renderSummary(papers, dateStr);
  const outputPath = path.join(DAILY_DIR, `${dateStr}-summary.md`);
  await fs.writeFile(outputPath, content, 'utf-8');

  // Update workspace README
  await updateWorkspaceReadme(papers.length, dateStr);

  return {
    papersCount: papers.length,
    outputPath,
  };
}

async function updateWorkspaceReadme(
  papersCount: number,
  lastSyncDate: string
): Promise<void> {
  const readmePath = path.join(DOCS_PAPERS_DIR, 'README.md');
  const content = renderReadme(papersCount, lastSyncDate);
  await fs.writeFile(readmePath, content, 'utf-8');
}
