interface Post {
  Content?: Component;
  frontmatter: {
    title: string;
    description: string;
    slug: string;
    draft?: boolean;
  };
}

interface Result {
  title: string;
  description: string;
  url: string;
}

interface Facet {
  _key: string;
  _doc_count: number;
  _name: string;
  _selected: boolean;
}

export type { Post, Result, Facet };
