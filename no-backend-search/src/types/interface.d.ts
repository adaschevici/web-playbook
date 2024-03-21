interface Post {
    Content?: Component;
    frontmatter: {
        title: string;
        description: string;
        slug: string;
        draft?: boolean;
    };
}

export type { Post }