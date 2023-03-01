import { mount } from "@vue/test-utils";
import App from "../App.vue";
import { describe, it, expect } from "vitest";

describe("App.vue", () => {
  it("should renders is page content is correct", () => {
    const message = "Welcome";
    const testMessage = "count is 0";
    const wrapper = mount(App, {
      props: { message },
    });

    expect(wrapper.text()).toBe(testMessage);
  });
});
