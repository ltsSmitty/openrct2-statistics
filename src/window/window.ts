import * as flex from "openrct2-flexui";
import { StatController } from "../objects/StatController";
import { mainTabContent } from "./tabs/mainTab";
import { extendedDisplayTabContent } from "./tabs/extendedDIsplayTab";

let window: flex.WindowTemplate;
let isWindowOpen = false;

export function initialize(sc: StatController) {
  window = flex.tabwindow({
    title: "OpenRCT2 Statistics",
    width: 250,
    height: "auto",
    position: "center",
    colours: [flex.Colour.LightBlue, flex.Colour.LightBlue, flex.Colour.White],
    onOpen: () => (isWindowOpen = true),
    onClose: () => (isWindowOpen = false),
    tabs: [mainTabContent(sc), extendedDisplayTabContent(sc)],
  });
}

/**
 * Opens the main window. If already open, the window will be focused.
 */
export function openWindow() {
  if (isWindowOpen) {
    window.focus();
  } else {
    window.open();
  }
}
