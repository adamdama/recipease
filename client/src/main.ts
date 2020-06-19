import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import { Auth0Plugin } from "./auth";
import { domain, clientId } from "../auth_config.json";

Vue.config.productionTip = false;

Vue.use(Auth0Plugin, {
    domain,
    clientId,
    onRedirectCallback: (appState: any) => {
        console.log(JSON.stringify(appState));
        router.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname
        );
    }
});

new Vue({
    router,
    render: (h) => h(App)
}).$mount("#app");
