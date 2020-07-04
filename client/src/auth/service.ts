import Vue from "vue";
import createAuth0Client, {
    Auth0Client,
    PopupConfigOptions,
    RedirectLoginOptions,
    GetIdTokenClaimsOptions,
    GetTokenSilentlyOptions,
    GetTokenWithPopupOptions,
    LogoutOptions,
    CacheLocation,
    Auth0ClientOptions
} from "@auth0/auth0-spa-js";
import { Component, Prop } from "vue-property-decorator";

export interface AuthServiceOnRedirectAppState {
    targetUrl?: string;
}

export interface AuthServiceOptions {
    domain: string;
    clientId: string;
    audience?: string;
    // Defaults for below are set in service
    redirectUri?: string;
    cacheLocation?: CacheLocation;
    onRedirectCallback?(appState: AuthServiceOnRedirectAppState): void;
}

export interface User {
    email: string;
    given_name: string;
    family_name: string;
    name: string;
    nickname: string;
}

@Component
export class AuthService extends Vue {
    public loading = true;

    public isAuthenticated = false;

    public popupOpen = false;

    public user?: User;

    public error: Error | null = null;

    @Prop({ required: true })
    private readonly options!: AuthServiceOptions;

    private auth0Client!: Auth0Client;

    private onRedirectCallback(appState?: AuthServiceOnRedirectAppState) {
        window.history.replaceState(
            {},
            document.title,
            appState?.targetUrl || window.location.pathname
        );
    }

    private readonly defaultAuth0Options: Auth0ClientOptions = {
        audience: "",
        domain: "",
        client_id: "",
        redirect_uri: window.location.origin,
        cacheLocation: "localstorage" as CacheLocation,
        useRefreshTokens: true
    };

    private get auth0Options(): Auth0ClientOptions {
        return {
            ...this.defaultAuth0Options,
            ...(this.options.domain && { domain: this.options.domain }),
            ...(this.options.clientId && { client_id: this.options.clientId }),
            ...(this.options.audience && { audience: this.options.audience }),
            ...(this.options.redirectUri && {
                redirect_uri: this.options.redirectUri
            }),
            ...(this.options.cacheLocation && {
                cacheLocation: this.options.cacheLocation
            })
        };
    }

    async created() {
        if (typeof this.options.onRedirectCallback === "function") {
            this.onRedirectCallback = this.options.onRedirectCallback;
        }
        this.auth0Client = await createAuth0Client(this.auth0Options);

        try {
            if (
                window.location.search.includes("code=") &&
                window.location.search.includes("state=")
            ) {
                const {
                    appState
                } = await this.auth0Client.handleRedirectCallback();
                this.error = null;
                this.onRedirectCallback(appState);
            }
        } catch (e) {
            this.error = e;
        } finally {
            this.isAuthenticated = await this.auth0Client.isAuthenticated();
            this.user = await this.auth0Client.getUser();
            this.loading = false;
        }
    }

    async loginWithPopup(o?: PopupConfigOptions) {
        this.popupOpen = true;

        try {
            await this.auth0Client.loginWithPopup(o);
            this.user = await this.auth0Client.getUser();
            this.isAuthenticated = await this.auth0Client.isAuthenticated();
            this.error = null;
        } catch (e) {
            this.error = e;
        } finally {
            this.popupOpen = false;
        }
    }

    async handleRedirectCallback() {
        this.loading = true;
        try {
            await this.auth0Client.handleRedirectCallback();
            this.user = await this.auth0Client.getUser();
            this.isAuthenticated = true;
            this.error = null;
        } catch (e) {
            this.error = e;
        } finally {
            this.loading = false;
        }
    }

    loginWithRedirect(o?: RedirectLoginOptions) {
        return this.auth0Client.loginWithRedirect(o);
    }

    getIdTokenClaims(o?: GetIdTokenClaimsOptions) {
        return this.auth0Client.getIdTokenClaims(o);
    }

    getTokenSilently(o?: GetTokenSilentlyOptions) {
        return this.auth0Client.getTokenSilently(o);
    }

    getTokenWithPopup(o?: GetTokenWithPopupOptions) {
        return this.auth0Client.getTokenWithPopup(o);
    }

    logout(o?: LogoutOptions) {
        return this.auth0Client.logout(o);
    }
}
