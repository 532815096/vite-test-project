import Vue from 'vue';
import App from './App.vue';
import resource from 'vue-resource';
import Router from "vue-router";
import routerOptions from "./router";
import kscComponent from 'ksc-components-vite'
import mixin from './js/mixin';

import 'ksc-components-vite/components/index.css';

Vue.use(kscComponent);
Vue.use(resource);
Vue.use(Router);
Vue.mixin(mixin);

Vue.config.productionTip = false;

let router = new Router(routerOptions);

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }

    next();
});

new Vue({
    router,
    components: {
        App
    },
    render: h => h(App)
}).$mount("#app")

// new Vue({
//     el: "#app",
//     router,
//     template: "<App/>",
//     components: {
//         App
//     }
// });