import Vue from "vue";
import VueApollo from "vue-apollo";
import App from "./App.vue";
import { router } from "./router";
import {
    AuthPlugin,
    AuthServiceOnRedirectAppState,
    AuthServiceOptions
} from "./auth";
import { domain, clientId } from "../auth_config.json";
import { createProvider } from "./apollo";

Vue.config.productionTip = false;

/** Auth */
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

/** Apollo */
Vue.use(VueApollo);

new Vue({
    router,
    apolloProvider: createProvider({ uri: "https://localhost:3000" }),
    render: (h) => h(App)
}).$mount("#app");
