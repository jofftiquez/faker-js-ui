import { defaultOptions, toText } from './use-generate';
import type { FakerMethod } from './faker/types';

/** Generate `count` values for a method (v1 "beast mode"). */
export async function bulkResult (
  method: FakerMethod,
  count: number,
  options?: Record<string, unknown>,
): Promise<unknown[]> {
  const opts = options ?? defaultOptions(method.params);
  const n = Math.max(0, Math.floor(Number.isFinite(count) ? count : 0));
  const out: unknown[] = [];
  for (let i = 0; i < n; i++) out.push(await method.fakerFn({ options: opts }));
  return out;
}

export function toJson (result: unknown[]): string {
  return JSON.stringify(result, null, 2);
}

/** v1 CSV shape: array rows are quoted+joined; scalar rows pass through one-per-line. */
export function convertArrayToCsv (array: unknown[]): string {
  const rows: string[] = [];
  for (const row of array) {
    if (Array.isArray(row)) {
      rows.push(
        row
          .map((v) => (typeof v === 'string' ? `"${v.replace(/"/g, '""')}"` : String(v)))
          .join(','),
      );
    } else {
      rows.push(typeof row === 'string' ? row : toText(row));
    }
  }
  return rows.join('\n');
}

function triggerDownload (filename: string, data: string, type: string) {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.textContent = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadJSON (result: unknown[]) {
  triggerDownload('fakerui.json', toJson(result), 'application/json');
}

export function downloadCSV (result: unknown[]) {
  triggerDownload('fakerui.csv', convertArrayToCsv(result), 'text/csv');
}
