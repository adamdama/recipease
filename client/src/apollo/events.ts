import { ApolloClient, InMemoryCache } from "apollo-boost";

async function resetState(apolloClient: ApolloClient<InMemoryCache>) {
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
export async function onLogin(apolloClient: ApolloClient<InMemoryCache>) {
    await resetState(apolloClient);
}

// Manually call this when user log out
export async function onLogout(apolloClient: ApolloClient<InMemoryCache>) {
    await resetState(apolloClient);
}
