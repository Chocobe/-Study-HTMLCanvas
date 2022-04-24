import {
  createRouter,
  RouteRecordRaw,
  createWebHistory,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "particle-network",
        name: "ParticleNetwork",
        component: () => import("@/views/ParticleNetwork.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;