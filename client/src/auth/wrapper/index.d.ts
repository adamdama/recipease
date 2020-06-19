import Vue from "vue";
import { RedirectLoginOptions } from "@auth0/auth0-spa-js";

type User = {
    email: string;
    given_name: string;
    family_name: string;
    name: string;
    nickname: string;
};

export interface AuthWrapper extends Vue {
    isAuthenticated: boolean;

    loading: boolean;

    loginWithRedirect(o: RedirectLoginOptions): Promise<void>;

    user: User;
}

export function getInstance(): AuthWrapper;

export interface Auth0Plugin {
    install(): void;
}

export const Auth0Plugin: Auth0Plugin;
