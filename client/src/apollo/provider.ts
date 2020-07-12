import Vue from "vue";
import VueApollo from "vue-apollo";
import ApolloClient from "apollo-client";
import { BatchHttpLink } from "apollo-link-batch-http";
import { RetryLink } from "apollo-link-retry";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { getInstance } from "@/auth";

// Install VueApollo plugin
Vue.use(VueApollo);

const logError = (message: string, prefix = "Apollo Error") => {
    // eslint-disable-next-line no-console
    console.log(
        `%c[${prefix}]`,
        "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
        message
    );
};

// Setup lnk for generic error handling of GQL and network level errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
            logError(
                `Message: ${message}, Location: ${JSON.stringify(
                    locations
                )}, Path: ${path}`,
                "GraphQL Error"
            )
        );
    }
    if (networkError) {
        logError(networkError.message, "Network Error");
    }
});

// Setup link to retry failed requests
// TODO: refresh the token
const retryLink = new RetryLink({
    // delay: {
    //     initial: 300,
    //     max: Infinity,
    //     jitter: true
    // },
    attempts: {
        max: 50
    }
});

// Setup the batch HTTP link to group calls
const batchLink = new BatchHttpLink({
    // You should use an absolute URL here
    uri: process.env.VUE_APP_GRAPHQL_URI
});

// Setup the recommended in-memory cache
const cache = new InMemoryCache();

export function createApolloProvider() {
    // Setup link to add Authorization header to requests
    const setAuthorizationLink = setContext(async () => {
        const auth = getInstance();
        return {
            headers: {
                Authorization: `Bearer ${await auth.getTokenSilently()}`
            }
        };
    });

    // Concat all links together for use
    const link = errorLink
        .concat(retryLink)
        .concat(setAuthorizationLink)
        .concat(batchLink);

    // Create the apollo client
    const apolloClient = new ApolloClient<NormalizedCacheObject>({
        link,
        cache,
        connectToDevTools: process.env.NODE_ENV !== "production"
    });

    // Create vue apollo provider
    const apolloProvider = new VueApollo({
        defaultClient: apolloClient,
        defaultOptions: {
            $query: {
                // fetchPolicy: 'cache-and-network',
            }
        },
        errorHandler() {
            // No need for errorHandler as we have the error link
        }
    });

    return apolloProvider;
}
