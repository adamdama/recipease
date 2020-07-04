<template>
    <div class="recipes">
        <h1>Recipes</h1>

        <recipes-list />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RecipesList from "@/components/RecipeList.vue";

@Component({
    components: { RecipesList }
})
export default class Recipes extends Vue {
    readonly name = "Recipes";
}
</script>
