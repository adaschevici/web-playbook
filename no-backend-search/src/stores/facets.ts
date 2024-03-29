import { atom }from 'nanostores';
import type { Facet } from '../types/interfaces';

export const facets = atom([]);

export const facetsVisible = atom(false);

export const addFacets = (facets: Facet) => {
  facets.set([...facets.get(), ...facets]);
}
