import { createRouter, createWebHashHistory } from "vue-router";
import PaperChat from './components/PaperChat.vue';
import HomePage from './components/HomePage.vue';
const router = createRouter({
  history : createWebHashHistory(),
  routes: [
    {
      path : '/',
      component: HomePage
    },
    {
      path: '/paper/:p',
      component: PaperChat
    }
  ]
});

export default router;