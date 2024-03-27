import { atom }from 'nanostores';
import type { Facet } from '../types/interfaces';

export const facets = atom([{
  _key: 'DORA',
  _doc_count: 24,
  _name: 'DORA',
  _selected: false,

}]);


export const facetsVisible = atom(false);

export const addFacets = (facets: Facet) => {
  facets.set([...facets.get(), ...facets]);
}

export const removeFacets = (facet: Facet) => {
  facets.set(facets.get().filter(f => f !== facet));
}
