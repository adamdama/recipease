import Vue from "vue";
import VueApollo from "vue-apollo";
import ApolloClient from "apollo-client";
import { BatchHttpLink } from "apollo-link-batch-http";
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

export function createApolloProvider() {
    // Setup link for added Authorization header
    const setAuthorizationLink = setContext(async () => {
        const auth = getInstance();
        return {
            headers: {
                authorization: `Bearer ${await auth.getTokenSilently()}`
            }
        };
    });

    // Setup lnk for generic error handling of GQL and network level errors
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) =>
                logError(
                    `Message: ${message}, Location: ${locations}, Path: ${path}`,
                    "GraphQL Error"
                )
            );
        }
        if (networkError) {
            logError(networkError.message, "Network Error");
        }
    });

    // Setup the batch HTTP link to group calls
    const batchLink = new BatchHttpLink({
        // You should use an absolute URL here
        uri: process.env.GRAPHQL_SERVER || "http://localhost:3000"
    });

    // Setup the recommended in-memory cache
    const cache = new InMemoryCache();

    // Concat all links together for use
    const link = errorLink.concat(setAuthorizationLink.concat(batchLink));

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
