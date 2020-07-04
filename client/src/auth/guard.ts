import { Route, NavigationGuardNext } from "vue-router";
import { getInstance } from "./plugin";

export const authGuard = (
    to: Route,
    from: Route,
    next: NavigationGuardNext<Vue>
) => {
    const authService = getInstance();

    const checkAuth = () => {
        if (authService.isAuthenticated) {
            next();
            return;
        }
        authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
    };

    if (!authService.loading) {
        checkAuth();
        return;
    }

    authService.$watch("loading", (loading: boolean) => {
        if (loading === false) {
            checkAuth();
        }
    });
};
