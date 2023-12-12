import { createRouter, createWebHistory } from "vue-router/auto";
import { viewTransitionSupported } from "../util/view-transition";

// routes: [
//     {
//         path: "/",
//         component: _rootLayout,
//         children: [
//             {
//                 path: "",
//                 component: HomeView
//             },
//             {
//                 path: "/about",
//                 // route level code-splitting
//                 // this generates a separate chunk (About.[hash].js) for this route
//                 // which is lazy-loaded when the route is visited.
//                 component: () => import("../views/AboutView.vue"),
//             },
//             {
//                 path: "/no",
//                 // route level code-splitting
//                 // this generates a separate chunk (About.[hash].js) for this route
//                 // which is lazy-loaded when the route is visited.
//                 component: Unauthorized,
//             },
//             {
//                 path: "/:path(.*)*",
//                 component: NotFound,

//             }
//         ],
//     },
// ],

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
});

router.beforeResolve(async () => {
    if (viewTransitionSupported(document)) {
        const viewTransition = document.startViewTransition(() => {

        });

        await viewTransition.ready;
    }
});

export default router;
