import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: import(
      /* webpackChunkName: "CheckerboardView" */ "@/views/CheckerboardView.vue"
    ),
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/DetailView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
