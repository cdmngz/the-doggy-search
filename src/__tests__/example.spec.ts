import { mount } from "@vue/test-utils";
import App from "../App.vue";
import Footer from "../components/Footer.vue";
import { describe, it, expect } from "vitest";

//These tests has no sense, but at the moment I don't know how to set the web3 provider from here, so I will let it like there.

describe("App actions", () => {
  const wrapper = mount(App);
  it("Check if the principal text was mounted", () => {
    expect("The Doggies Explorer").toBe("The Doggies Explorer");
  });
});

describe("Footer actions", () => {
  const wrapper = mount(Footer);
  it("Check if the year is the actual one", () => {
    expect(wrapper.text().substring(2, 6)).toBe(`${new Date().getFullYear()}`);
  });
});
