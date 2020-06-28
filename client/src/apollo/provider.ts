import Vue from "vue";
import ApolloClient, { PresetConfig } from "apollo-boost";
import VueApollo from "vue-apollo";

// Install VueApollo plugin
Vue.use(VueApollo);

export type ApolloProviderOptions = PresetConfig;

const defaultOptions: ApolloProviderOptions = {
    uri: process.env.GRAPHQL_SERVER || "http://localhost:3000"
};

export function createApolloProvider(options?: ApolloProviderOptions) {
    // Create vue apollo provider
    const apolloProvider = new VueApollo({
        defaultClient: new ApolloClient({ ...defaultOptions, ...options }),
        defaultOptions: {
            $query: {
                // fetchPolicy: 'cache-and-network',
            }
        },
        errorHandler(error) {
            // eslint-disable-next-line no-console
            console.log(
                "%cError",
                "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
                error.message
            );
        }
    });

    return apolloProvider;
}
