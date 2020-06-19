<template>
    <div id="nav">
        <h1>{{ title }}</h1>
        <router-link
            v-for="route in routes"
            :key="route.path"
            :to="route.path"
            >{{ route.name }}</router-link
        >
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { routes } from "../router";

@Component({
    name: "Navigation"
})
export default class Navigation extends Vue {
    @Prop() private title!: string;

    private routes = routes;
}
</script>
