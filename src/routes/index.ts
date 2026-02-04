import { createWebHistory, createRouter } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import GamePage from "../pages/GamePage.vue";
import { usePlayersStore } from "../store/player";

type TRouteNames = "game" | "home";
interface IRouteName {
  [key: string]: TRouteNames;
}

export const routeNames: IRouteName = {
  game: "game",
  home: "home",
};

const routes = [
  {
    path: "/",
    name: routeNames.home,
    component: HomePage,
    meta: { requiresAuth: false },
  },
  {
    path: "/game",
    name: routeNames.game,
    component: GamePage,
    meta: { requiresAuth: true },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const store = usePlayersStore();

  if (to.meta.requiresAuth && !store.currentPlayerName) return "/";
});
