import Vue from "vue";
import App from "@/App.vue";
import { router } from "@/router";
import {
    AuthPlugin,
    AuthServiceOnRedirectAppState,
    AuthServiceOptions
} from "@/auth";
import { createApolloProvider } from "@/apollo";
import { domain, clientId, audience } from "../auth_config.json";

Vue.config.productionTip = false;

/** Auth */
const authPluginOptions: AuthServiceOptions = {
    audience,
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
    apolloProvider: createApolloProvider(),
    render: (h) => h(App)
}).$mount("#app");
