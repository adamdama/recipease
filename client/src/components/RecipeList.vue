<template>
    <div>
        <!-- TODO MAKE AN ERROR DISPLAY COMPONENT AND / OR USE SNACKBAR ERRORS -->
        <div v-if="errors.length">
            <span v-for="error in errors" :key="error.message">
                Error: {{ error.message }}
            </span>
        </div>
        <ul v-else-if="recipes">
            <li v-for="recipe in recipes.recipes" :key="recipe.id">
                {{ recipe.title }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import getRecipes from "@/apollo/graphql/queries/recipes.gql";
import { GraphQLError } from "graphql";

@Component({
    apollo: {
        recipes: {
            query: getRecipes,
            error(error) {
                this.errorHandler(error.graphQLErrors);
            }
        }
    }
})
export default class RecipeList extends Vue {
    private errors: ReadonlyArray<GraphQLError> = [];

    errorHandler(errors: [GraphQLError]) {
        this.errors = errors;
    }
}
</script>
