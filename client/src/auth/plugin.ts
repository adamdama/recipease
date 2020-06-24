import { VueConstructor } from "vue";
import { AuthService, AuthServiceOptions } from "./service";

const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, window.location.pathname);

let instance: AuthService;

export const getInstance = () => instance;

const useAuth0 = ({
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    redirectUri = window.location.origin,
    ...options
}: AuthServiceOptions) => {
    if (instance) {
        return instance;
    }

    instance = new AuthService({
        propsData: {
            options: {
                onRedirectCallback,
                redirectUri,
                ...options
            }
        }
    });

    return instance;
};

export const Auth0Plugin = {
    install(V: VueConstructor, options: AuthServiceOptions) {
        // eslint-disable-next-line no-param-reassign
        V.prototype.$auth = useAuth0(options);
    }
};
