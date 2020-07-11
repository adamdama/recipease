<template>
    <div id="nav">
        <h1>{{ title }}</h1>
        <router-link
            v-for="route in routes"
            :key="route.path"
            :to="route.path"
            >{{ route.name }}</router-link
        >
        <a v-if="isLoggedIn" class="logout" @click="logout()">Logout</a>
        <a v-else class="login" @click="login()">Login</a>
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

    get isLoggedIn() {
        return this.$auth.isAuthenticated;
    }

    login() {
        this.$auth.loginWithRedirect();
    }

    logout() {
        this.$auth.logout();
    }
}
</script>

<style lang="scss" scoped>
a.logout,
a.login {
    cursor: pointer;
    text-decoration: underline;
}
</style>
