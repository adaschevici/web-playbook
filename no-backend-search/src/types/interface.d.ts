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

export type { Post, Result };
