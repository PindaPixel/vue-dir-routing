import antfu from '@antfu/eslint-config';

export default antfu({
    stylistic: {
        indent: 4,
        semi: true,
    },
    rules: {
        'style/brace-style': ['error', 'allman'],
        'perfectionist/sort-imports': ['error', {
            'type': 'natural',
            'groups': [
                'type',
                'builtin',
                'vite',
                'vue',
                'vue-use',
                'external',
                'internal-type',
                'internal-components',
                'internal-rest',
                ['parent-type', 'sibling-type', 'index-type'],
                ['parent', 'sibling', 'index'],
                'side-effect',
                'internal-assets',
                'object',
                'unknown',
            ],
            'custom-groups': {
                value: {
                    'vue': ['vue', 'vue-router', 'vue-router/*'],
                    'vue-use': ['@vueuse/*'],
                    'vite': ['vite', '@vitejs/*', '*/vite'],
                    'internal-components': ['**/*.vue'],
                    'internal-assets': ['@/assets/**'],
                    'internal-rest': ['@/**'],
                },
            },
        }],
    },
});
