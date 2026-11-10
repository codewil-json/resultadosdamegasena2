import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";

const app = createApp(App)

import TitleComponent from '@/components/TitleComponent'

app.use(router);
app.component("TitleComponent", TitleComponent);

let revealObserver;
const revealDirective = {
  mounted(element) {
    element.classList.add('scroll-reveal');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      element.classList.add('scroll-reveal--visible');
      return;
    }

    element.classList.add('scroll-reveal--pending');
    revealObserver ||= new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-reveal--visible');
          entry.target.classList.remove('scroll-reveal--pending');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px',
    });

    revealObserver.observe(element);
  },
  unmounted(element) {
    revealObserver?.unobserve(element);
  },
};

app.directive('reveal', revealDirective);

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);

  const pageTitle = to.meta.title || "Resultados da Mega Sena";
  document.title = `Resultados da Mega Sena | ${pageTitle}`;

  next();
});

app.mount("#app");
