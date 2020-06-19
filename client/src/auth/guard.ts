import { Route, NavigationGuardNext } from "vue-router";
import { getInstance } from "./wrapper";

export const authGuard = (
    to: Route,
    from: Route,
    next: NavigationGuardNext<Vue>
) => {
    const authService = getInstance();

    const checkAuth = () => {
        console.log("checking auth");
        if (authService.isAuthenticated) {
            next();
            return;
        }
        const appState = { targetUrl: to.fullPath };
        console.log("not authed", { appState });
        console.log(JSON.stringify({ appState }));
        authService.loginWithRedirect({ appState });
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
