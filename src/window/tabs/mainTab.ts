import * as flex from "openrct2-flexui";
import { StatController } from "../../objects/StatController";
import { getPausedWidget } from "../windowPause";
import { getResetWidget } from "../windowReset";

const statIncreaseIcon: ImageAnimation = {
  frameBase: 5391,
  frameCount: 16,
  frameDuration: 8,
};

export const mainTabContent = (statController: StatController) =>
  flex.tab({
    image: statIncreaseIcon,
    content: [
      // spread in the widgets from the StatController
      ...statController.widgets,
      getPausedWidget(),
      // pass in the StatController to pass through the reset functions
      getResetWidget(statController),
      // it's also possible to add widgets directly to the window if there are other custom widgets
    ],
  });
