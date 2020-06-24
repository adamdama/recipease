import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

export interface ApolloProviderOptions {
    uri: string;
}

export const createProvider = (options: ApolloProviderOptions) => {
    const apolloClient = new ApolloClient({
        // You should use an absolute URL here
        uri: options.uri
    });

    const apolloProvider = new VueApollo({
        defaultClient: apolloClient
    });

    return apolloProvider;
};
