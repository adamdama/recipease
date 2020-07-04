<template>
    <div>
        <ul>
            <li v-for="recipe in recipes" :key="recipe.id">
                {{ recipe.title }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import getRecipes from "@/apollo/graphql/queries/recipes.gql";

@Component({
    apollo: {
        recipes: {
            query: getRecipes
        }
    }
})
export default class RecipeList extends Vue {}
</script>
