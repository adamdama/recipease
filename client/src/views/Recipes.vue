<template>
    <div class="recipes">
        <h1>Recipes</h1>
        <span>{{ text }}</span>
        <button @click="addRecipe">Add Recipes</button>
    </div>
</template>

<script>
export default {
    name: "Recipes",
    data: () => {
        return {
            list: []
        };
    },
    computed: {
        text() {
            return `You have ${this.recipeCount} recipes.`;
        },
        recipeCount() {
            return this.list.length;
        }
    },
    methods: {
        addRecipe() {
            this.list.push({});
        }
    }
};
</script>
