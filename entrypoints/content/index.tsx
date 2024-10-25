import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/assets/tailwind.css";
import { waitElement } from "@1natsu/wait-element";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "wxt-react-example",
      position: "inline",
      anchor: `.msg-form__contenteditable`,
      append: "after",
      onMount: (container) => {
        const wrapper = document.createElement("div");
        container.append(wrapper);

        const root = ReactDOM.createRoot(wrapper);
        root.render(<App />);
        return { root, wrapper };
      },
      onRemove: (elements) => {
        elements?.root.unmount();
        elements?.wrapper.remove();
      },
    });

    const anchor = (await waitElement(
      ".msg-form__contenteditable"
    )) as HTMLElement;

    anchor.parentElement?.classList.add("relative");
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
    });

    ctx.addEventListener(window, "wxt:locationchange", async () => {
      ctx.addEventListener(anchor, "focus", (e) => {
        if (anchor && !ui.mounted) ui.mount();
      });
      ctx.addEventListener(window, "focusout", (e) => {
        if (
          e.relatedTarget == ui.shadowHost ||
          ui.shadowHost.contains(e.relatedTarget as Node)
        ) {
        } else {
          ui.remove();
        }
      });
    });

    ctx.addEventListener(anchor, "focus", (e) => {
      if (anchor && !ui.mounted) ui.mount();
    });
    ctx.addEventListener(window, "focusout", (e) => {
      if (
        e.relatedTarget == ui.shadowHost ||
        ui.shadowHost.contains(e.relatedTarget as Node)
      ) {
      } else {
        ui.remove();
      }
    });
  },
});
