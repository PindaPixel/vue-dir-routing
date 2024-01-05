import antfu from '@antfu/eslint-config';

export default antfu({
    stylistic: {
        indent: 4,
        semi: true,
    },
    rules: {
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
                'internal',
                ['parent-type', 'sibling-type', 'index-type'],
                ['parent', 'sibling', 'index'],
                'object',
                'unknown',
            ],
            'internal-pattern': ['@/**'],
            'custom-groups': {
                value: {
                    'vue': ['vue', 'vue-router', 'vue-router/*'],
                    'vue-use': ['@vueuse/*'],
                    'vite': ['vite', '@vitejs/*', '*/vite'],
                    'internal-components': ['@/**.vue'],
                },
            },
        }],
    },
});
