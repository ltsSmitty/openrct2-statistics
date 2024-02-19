import { dropdown, groupbox } from "openrct2-flexui";
import { selectedIndex } from "./extendedDIsplayTab";
import { StatController } from "../../objects/StatController";

export const statSelectionDropdown = (statController: StatController) => {
  return groupbox({
    text: "Select Statistic",
    content: [
      dropdown({
        selectedIndex,
        items: statController.statistics.map((stat) => stat.statName),
        onChange: (index) => {
          selectedIndex.set(index);
        },
      }),
    ],
  });
};
