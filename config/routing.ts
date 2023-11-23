import type VueRouter from "unplugin-vue-router/vite";

type Options = Parameters<typeof VueRouter>[0];
type RoutesFolder = NonNullable<Options>["routesFolder"];

// [base url, source folder (case sensitive)]
// all but base require a leading slash if it should be rendered in the base layout
const routerFolders: [string, string][] = [
    ["", "src/modules/Base"],
    // ["/", "src/Modules/Home"],
    ["/check/reports", "src/modules/Reports/Pages"],
    ["/account", "src/modules/Account/Pages"],
];

const routesFolder: RoutesFolder = routerFolders
    .map(([baseUrl, srcFolder]) => {
        return [
            {
                src: srcFolder,
                extensions: [".vue"],
                filePatterns: ["**/*Layout", "**/*Layout@"],
                path(filePath) {
                    return pathToUrlBaseTransform(
                        filePath,
                        srcFolder,
                        baseUrl,
                    ).replace(/\/?\w+layout\.vue/g, ".vue");
                },
            },
            {
                src: srcFolder,
                extensions: [".vue"],
                filePatterns: ["**/*Page", "**/*Page@"],
                path(filePath) {
                    return pathToUrlBaseTransform(
                        filePath,
                        srcFolder,
                        baseUrl,
                    ).replace(/\/?\w+page/g, "/index");
                },
            },
            {
                src: srcFolder,
                extensions: [".vue"],
                filePatterns: ["**/*Layout", "**/*Layout@"],
                path(filePath) {
                    return pathToUrlBaseTransform(
                        filePath,
                        srcFolder,
                        baseUrl,
                    ).replace(/\/?\w+layout\.vue/g, "/[...index]");
                },
            },
        ] satisfies RoutesFolder;
    })
    .flat();

function pathToUrlBaseTransform(
    filePath: string,
    srcFolder: string,
    baseUrl: string,
): string {
    return resetLayout(
        baseUrl +
            filePath
                .toLowerCase()
                .slice(filePath.lastIndexOf(srcFolder) + srcFolder.length),
    );
}

function resetLayout(filePath: string) {
    const match = /(.+@)(.*)/g.exec(filePath);

    if (!match) return filePath;

    const [, replace, rest] = match;

    return replace.slice(1).replaceAll("@", "").replaceAll("/", ".") + rest;
}

export default {
    routesFolder: [...routesFolder],
    importMode(filepath) {
        return filepath.indexOf("Layout.vue") > -1 ||
            filepath.toLowerCase() === "@/router/components/notfound.vue"
            ? "sync"
            : "async";
    },
    extendRoute(route) {
        if (route.path !== ":index(.*)" || route.components.get("default"))
            return;

        route.components.set("default", "@/router/components/NotFound.vue");
    },
    getRouteName(node) {
        const { components, path } = node.value;

        const defaultComponent = components.get("default");

        if (defaultComponent && defaultComponent.indexOf("Layout.vue") > -1) {
            if (path === "/") return "base-layout";
            // remove leading slash
            return path.slice(1) + "-layout";
        }

        if (path === "/") return "home";

        return path.slice(1).replace(":index(.*)", "not-found");
    },
} satisfies Options;
