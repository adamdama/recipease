import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import {
    AuthPlugin,
    AuthServiceOnRedirectAppState,
    AuthServiceOptions
} from "./auth";
import { domain, clientId } from "../auth_config.json";

Vue.config.productionTip = false;

const authPluginOptions: AuthServiceOptions = {
    domain,
    clientId,
    onRedirectCallback: (appState: AuthServiceOnRedirectAppState) => {
        router.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname
        );
    }
};

Vue.use(AuthPlugin, authPluginOptions);

new Vue({
    router,
    render: (h) => h(App)
}).$mount("#app");
