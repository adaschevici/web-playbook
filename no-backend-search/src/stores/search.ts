import { atom } from 'nanostores';
import type { Result } from './types/interfaces';

export const searchResults = atom<Result[]>([]);

export function setResults(results: Result[]) {
  searchResults.set(results);
}
