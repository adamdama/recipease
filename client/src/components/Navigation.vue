<template>
    <div id="nav">
        <h1>{{ title }}</h1>
        <router-link to="/">Home</router-link>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Navigation extends Vue {
    readonly name: string = "Navigation";

    @Prop() private title!: string;
}
</script>
