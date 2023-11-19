import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import _rootLayout from "@/views/_root.layout.vue";
import Unauthorized from "@/components/Unauthorized.vue";
import NotFound from "@/components/NotFound.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: _rootLayout,
            children: [
                {
                    path: "",
                    component: HomeView
                },
                {
                    path: "/about",
                    // route level code-splitting
                    // this generates a separate chunk (About.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import("../views/AboutView.vue"),
                },
                {
                    path: "/no",
                    // route level code-splitting
                    // this generates a separate chunk (About.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: Unauthorized,
                },
                {
                    path: "/:path(.*)*",
                    component: NotFound,

                }
            ],
        },
    ],
});

export default router;
