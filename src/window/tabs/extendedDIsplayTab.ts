import { createExtendedTab } from "./createExtendedTab";
import { tab, store } from "openrct2-flexui";
import { StatController } from "../../objects/StatController";
import { statSelectionDropdown } from "./statSelectionDropdown";

const statIncreaseIcon: ImageAnimation = {
  frameBase: 5367,
  frameCount: 8,
  frameDuration: 8,
};

export const selectedIndex = store<number>(0);

export const extendedDisplayTabContent = (statController: StatController) => {
  const extendedTabs = statController.statistics.map((stat, index) => {
    return createExtendedTab(stat.extendedDisplayWidget, index);
  });

  return tab({
    image: statIncreaseIcon,
    content: [statSelectionDropdown(statController), ...extendedTabs],
  });
};
