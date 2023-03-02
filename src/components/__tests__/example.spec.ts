import { mount } from "@vue/test-utils";
import App from "../../App.vue";
import Footer from "../../components/Footer.vue";
import { describe, it, expect } from "vitest";

// Problems in the initial render with WebGL and Web3

describe("Footer actions", () => {
  const wrapper = mount(Footer);
  it("Check if the year is the actual one", () => {
    expect(wrapper.text().substring(2, 6)).toBe(`${new Date().getFullYear()}`);
  });
});
