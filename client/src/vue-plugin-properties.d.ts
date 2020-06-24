// This dead import must be left
// Ref: https://vuejs.org/v2/guide/typescript.html#Augmenting-Types-for-Use-with-Plugins
import Vue from "vue";

import * as Auth from "./auth";

declare module "vue/types/vue" {
    // 3. Declare augmentation for Vue
    interface Vue {
        readonly $auth: Auth.AuthService;
    }
}
