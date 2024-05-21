import { expect, test, describe, it, vi } from "vitest";
import Componente from "../components/Componente.vue";
import { mount } from "@vue/test-utils";

test("test de prueba", async () => {
  expect(Componente).toBeTruthy();
  const wrapper = mount(Componente, {
    props: {
      title: "Guess User Age App",
    },
  });
  expect(wrapper.text()).toContain("Guess User Age App");
});

describe("Componente", () => {
  it("should call getConsole when button is clicked", async () => {
    const wrapper = mount(Componente);

    const getConsole = vi.spyOn(wrapper.vm, "getConsole");

    await wrapper.find("button").trigger("click");

    expect(getConsole).toHaveBeenCalled();
  });
});
