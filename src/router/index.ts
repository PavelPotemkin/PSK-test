import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CheckerboardView from "@/views/CheckerboardView.vue";
import DetailView from "@/views/DetailView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: CheckerboardView,
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: DetailView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
