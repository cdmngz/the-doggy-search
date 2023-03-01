import { mount } from "@vue/test-utils";
import HelloWorld from "../components/HelloWorld.vue";
import { describe, it, expect } from "vitest";

describe("HelloWorld.vue", () => {
  it("should renders is page content is correct", () => {
    const message = "Welcome";
    const testMessage = "count is 0";
    const wrapper = mount(HelloWorld, {
      props: { message },
    });

    expect(wrapper.text()).toBe(testMessage);
  });
});
