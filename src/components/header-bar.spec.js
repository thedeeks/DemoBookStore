import { HeaderBar } from './components/header-bar.vue';
import { mount, shallowMount } from '@vue/test-utils';

describe("The Header Bar", function() {

    it("should have a name", () => {

        const shallowWrapper = shallowMount(HeaderBar);

        expect(shallowWrapper.findAll("#navbar-item")).toBe("Demo Book Store");
    });
});