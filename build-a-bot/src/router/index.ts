import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/home/HomePage.vue";
import RobotBuilder from "@/build/RobotBuilder.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/build",
    name: "Build",
    component: RobotBuilder,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;