import type { Options } from 'unplugin-vue-router/options';

type RoutesFolder = NonNullable<Options>['routesFolder'];

// [base url, source folder (case sensitive)]
// all but base require a leading slash if it should be rendered in the base layout
const routerFolders: [string, string][] = [
    ['', 'src/modules/Base'],
    ['/', 'src/Modules/Home'],
    ['/check/reports', 'src/modules/Reports/Pages'],
    ['/account', 'src/modules/Account/Pages'],
    ['/nested', 'src/modules/Nested/Pages'],
];

const routesFolder: RoutesFolder = routerFolders
    .map(([baseUrl, srcFolder]) =>
    {
        return [
            {
                src: srcFolder,
                extensions: ['.vue'],
                filePatterns: ['**/*Layout', '**/*Layout@'],
                path(filePath)
                {
                    return pathToUrlBaseTransform(
                        filePath,
                        srcFolder,
                        baseUrl,
                    ).replace(/\/?\w+layout\.vue/g, '.vue');
                },
            },
            // The difference with layouts and pages in the configuration is that pages end with /index.vue
            // This tells unplugin-vue-router that the route cannot contain child routes (which are rendered in a RouterView component)
            {
                src: srcFolder,
                extensions: ['.vue'],
                filePatterns: ['**/*Page', '**/*Page@'],
                path(filePath)
                {
                    return pathToUrlBaseTransform(
                        filePath,
                        srcFolder,
                        baseUrl,
                    ).replace(/\/?\w+page/g, '/index')
                        .replace(/(\[.+\]\+?)\/index/g, "$1");
                    // The second replace makes sure that dynamic routes are not nested an extra level
                    // See the discussion below for details why we do not want this
                    // https://github.com/vuejs/router/discussions/2168#discussioncomment-8788335
                },
            },
            // These are catch-all routes which will trigger when no other route was found under a layout component
            // Below in the extendRoute function we make sure that the NotFound component is rendered on this catch-all route
            // which simply throws a NotFoundException.
            // This enables layout components to implement a 404 using onErrorCaptured
            {
                src: srcFolder,
                extensions: ['.vue'],
                filePatterns: ['**/*Layout', '**/*Layout@'],
                path(filePath)
                {
                    return pathToUrlBaseTransform(
                        filePath,
                        srcFolder,
                        baseUrl,
                    ).replace(/\/?\w+layout\.vue/g, '/[...index]');
                },
            },
        ] satisfies RoutesFolder;
    })
    .flat();

function pathToUrlBaseTransform(
    filePath: string,
    srcFolder: string,
    baseUrl: string,
): string
{
    return resetLayout(
        baseUrl
        + filePath
            .toLowerCase()
            .slice(filePath.lastIndexOf(srcFolder) + srcFolder.length),
    );
}

function resetLayout(filePath: string)
{
    const match = /(.+@)(.*)/g.exec(filePath);

    if (!match)
        return filePath;

    const [, replace, rest] = match;

    // Using a dot instead of a slash as path divider tells unplugin-vue router to hoist the route to the root of the route tree,
    // meaning it has no parent layout anymore.
    // We replace all slashes up until the @ symbol, meaning route nesting will be enabled once again past this point
    return replace.slice(1).replaceAll('@', '').replaceAll('/', '.') + rest;
}

const options: Options = {
    routesFolder,
    importMode(filepath)
    {
        return filepath.includes('Layout.vue')
            || filepath.toLowerCase() === '@/router/components/notfound.vue'
            ? 'sync'
            : 'async';
    },
    extendRoute(route)
    {
        // Render an empty component at catch-all routes that simply throws a NotFound error
        // which can be caught using onErrorCaptured in a parent component.
        if (route.path !== ':index(.*)')
            return;

        route.components.set('default', '@/router/components/NotFound.vue');
    },
    getRouteName(node)
    {
        // Customising route names has no real function
        // We use the name of the route to define type-safe links (RouterLink's `to` prop)
        // Giving them a custom name this way just makes it easier to distinguish
        // layouts from pages, since you shouldn't link to a layout
        const { components, path } = node.value;

        const defaultComponent = components.get('default');

        if (defaultComponent && defaultComponent.includes('Layout.vue'))
        {
            if (path === '/')
                return 'base-layout';
            // remove leading slash
            return `${path.slice(1)}-layout`;
        }

        if (path === '/')
            return 'home';

        return path.slice(1).replace(':index(.*)', 'not-found');
    },
};

export default options;
