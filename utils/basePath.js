const isGithub = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
export const basePath = isGithub ? '/mebel-site' : '';