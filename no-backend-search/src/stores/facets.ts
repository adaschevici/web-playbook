import { atom }from 'nanostores';
import type { Facet } from '../types/interfaces';

export const facets = atom([{
  _key: 'DORA',
  _doc_count: 24,
  _name: 'DORA',
  _selected: false,

}]);


export const facetsVisible = atom(false);

const updateFacets = (facet: Facet) => {
  const mergedFacets: Facet[] = [...facets.get(), ...facet].reduce((acc, current) => {
    acc[current._key] = current;
    return acc;
  }, {});
  console.log(mergedFacets);
  facets.set(Object.values(mergedFacets));
}

export const removeFacets = (facet: Facet) => {
  facets.set(facets.get().filter(f => f !== facet));
}

export {
  updateFacets
}
