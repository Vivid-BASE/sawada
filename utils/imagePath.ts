export const getImagePath = (src: string | undefined | null) => {
    // Handle undefined or null
    if (!src) return '';

    // If it's an external URL, return as is
    if (src.startsWith('http') || src.startsWith('//')) {
        return src;
    }

    // Determine the base path based on environment
    // For GitHub Pages, we need the repository name as a prefix
    const basePath = process.env.NODE_ENV === 'production' ? '/sawada' : '';

    // Ensure src starts with /
    const normalizedSrc = src.startsWith('/') ? src : `/${src}`;

    // Return combined path
    // Avoid double slashes if basePath is empty and src starts with /
    return `${basePath}${normalizedSrc}`;
};
