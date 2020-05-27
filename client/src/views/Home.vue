<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <h1>Welcome to Recipease</h1>
        <p>
            Recipease is here to help you plan your meals, store recipes and
            share your cooking ideas.
        </p>
        <p>Add your first recipe now!</p>
        <router-link to="/recipes">Recipes</router-link>
    </div>
</template>

<script>
export default {
    name: "Home"
};
</script>
