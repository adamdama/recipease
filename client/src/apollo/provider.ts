import Vue from "vue";
import ApolloClient, { PresetConfig } from "apollo-boost";
import VueApollo from "vue-apollo";

/** Apollo */
Vue.use(VueApollo);

export type ApolloProviderOptions = PresetConfig;

export function createApolloProvider(options: ApolloProviderOptions) {
    // Create vue apollo provider
    const apolloProvider = new VueApollo({
        defaultClient: new ApolloClient(options),
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
