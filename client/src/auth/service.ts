import Vue from "vue";
import createAuth0Client, {
    Auth0Client,
    PopupConfigOptions,
    RedirectLoginOptions,
    GetIdTokenClaimsOptions,
    GetTokenSilentlyOptions,
    GetTokenWithPopupOptions,
    LogoutOptions
} from "@auth0/auth0-spa-js";
import { Component, Prop } from "vue-property-decorator";

export interface AuthServiceOnRedirectAppState {
    targetUrl?: string;
}

export type AuthServiceOptions = {
    audience: string;
    domain: string;
    clientId: string;
    redirectUri: string;
    onRedirectCallback(appState: AuthServiceOnRedirectAppState): void;
};

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

    public isAuthenticated = true;

    public popupOpen = false;

    public user?: User;

    public error: Error | null = null;

    @Prop({ required: true }) private readonly options!: AuthServiceOptions;

    private auth0ClientInstance?: Auth0Client;

    get auth0Client(): Auth0Client {
        if (!this.auth0ClientInstance) {
            throw new Error("Auth0 not connected");
        }
        return this.auth0ClientInstance;
    }

    set auth0Client(client: Auth0Client) {
        this.auth0ClientInstance = client;
    }

    async created() {
        this.auth0Client = await createAuth0Client({
            domain: this.options.domain,
            client_id: this.options.clientId,
            audience: this.options.audience,
            redirect_uri: this.options.redirectUri
        });

        try {
            if (
                window.location.search.includes("code=") &&
                window.location.search.includes("state=")
            ) {
                const {
                    appState
                } = await this.auth0Client.handleRedirectCallback();
                this.error = null;
                this.options.onRedirectCallback(appState);
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
