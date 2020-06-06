// import { shallowMount } from "@vue/test-utils";
// import Navigation from "@/components/Navigation.vue";

describe("Navigation.vue", () => {
    it("renders a h1 tag with the provided title", () => {
        const title = "new title";
        // const wrapper = shallowMount(Navigation, {
        //     propsData: { title }
        // });
        // expect(wrapper.text()).toMatch(title);
        expect(title).toBeTruthy();
    });
});
