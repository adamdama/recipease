import ApolloClient from "apollo-client";
import { NormalizedCacheObject } from "apollo-cache-inmemory";

async function resetState(apolloClient: ApolloClient<NormalizedCacheObject>) {
    try {
        await apolloClient.resetStore();
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(
            "%cError on cache reset (login)",
            "color: orange;",
            e.message
        );
    }
}

// TODO: hook this into the login / logout system

// Manually call this when user log in
export async function onLogin(
    apolloClient: ApolloClient<NormalizedCacheObject>
) {
    await resetState(apolloClient);
}

// Manually call this when user log out
export async function onLogout(
    apolloClient: ApolloClient<NormalizedCacheObject>
) {
    await resetState(apolloClient);
}
