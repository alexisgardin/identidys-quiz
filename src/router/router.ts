import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/components/layout/Layout.vue";
import Home from "@/components/Home.vue";
import QuizComponent from "@/components/QuizComponent.vue";
import Result from "@/components/Result.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home
      },
      {
        path: "/quiz",
        name: "Quiz",
        component: QuizComponent
      },
    ]
  },
  {
    path: "/result",
    name: "result",
    component: Result
  }
  /** {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.

  } **/
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
