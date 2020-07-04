import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Profile from "@/views/Profile.vue";
import Home from "@/views/Home.vue";
import Recipes from "@/views/Recipes.vue";
import { authGuard } from "@/auth";

Vue.use(VueRouter);

export const routes: RouteConfig[] = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        beforeEnter: authGuard
    },
    {
        path: "/recipes",
        name: "Recipes",
        component: Recipes,
        beforeEnter: authGuard
    }
    // {
    //     path: "/about",
    //     name: "About",
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import(/* webpackChunkName: "about" */ "@/views/About.vue")
    // }
];

export const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
