// This dead import must be left
// Ref: https://vuejs.org/v2/guide/typescript.html#Augmenting-Types-for-Use-with-Plugins
import Vue from "vue";

import * as Auth from "./auth/wrapper";

declare module "vue/types/vue" {
    // 3. Declare augmentation for Vue
    interface Vue {
        readonly $auth: Auth.AuthWrapper;
    }
    // // 3. Declare augmentation for Vue
    // interface VueConstructor {
    //     readonly $auth: Auth.AuthWrapper;
    // }
}
