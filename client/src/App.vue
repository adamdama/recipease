<template>
    <div id="app">
        <Navigation :title="name" />
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "./components/Navigation.vue";

@Component({
    name: "App",
    components: {
        Navigation
    }
})
export default class App extends Vue {
    readonly name: string = "Recipease";
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
