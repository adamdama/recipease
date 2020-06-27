<template>
    <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import getRecipes from "@/apollo/graphql/queries/recipes.gql";

@Component
export default class RecipeList extends Vue {
    // private recipes: Recipe[];

    private apollo = {
        recipes: {
            query: getRecipes
        }
    };
}
</script>
