import { VueConstructor } from "vue";
import { AuthService, AuthServiceOptions } from "./service";

let instance: AuthService;

export const getInstance = (): AuthService => instance;

const useAuth0 = (options: AuthServiceOptions) => {
    if (instance) {
        return instance;
    }

    instance = new AuthService({
        propsData: { options }
    });

    return instance;
};

export const AuthPlugin = {
    install(V: VueConstructor, options: AuthServiceOptions) {
        // eslint-disable-next-line no-param-reassign
        V.prototype.$auth = useAuth0(options);
    }
};
