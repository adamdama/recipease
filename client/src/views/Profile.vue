<template>
    <div class="container">
        <div class="row align-items-center profile-header">
            <div class="col-md-2 mb-3">
                <img
                    :src="$auth.user.picture"
                    alt="User's profile picture"
                    class="rounded-circle img-fluid profile-picture"
                />
            </div>
            <div class="col-md text-center text-md-left">
                <h2>{{ $auth.user.name }}</h2>
                <p class="lead text-muted">{{ $auth.user.email }}</p>
            </div>
        </div>

        <div class="row">
            <pre><code class="json">{{JSON.stringify($auth.user, null, 2)}}</code></pre>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Profile extends Vue {
    get userJson() {
        return JSON.stringify(this.$auth.user, null, 2);
    }
}
</script>
