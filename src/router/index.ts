import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/dashboard",
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: () => import("../views/DashboardView.vue"),
        },
        {
            path: "/quiz/:quiz_id",
            name: "quiz",
            component: () => import("../views/QuizView.vue"),
        },
        {
            path: "/quiz/:quiz_id/question/:question_id",
            name: "question",
            component: () => import("../views/QuizView.vue"),
        },
    ],
});

export default router;
