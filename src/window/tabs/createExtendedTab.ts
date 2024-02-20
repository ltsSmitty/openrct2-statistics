import { FlexiblePosition, WidgetCreator, box, compute } from "openrct2-flexui";
import { selectedIndex } from "./extendedDIsplayTab";
import { getElementVisibility } from "../../helpers/flexHelper";

export const createExtendedTab = (
  content: WidgetCreator<FlexiblePosition>,
  index: number
) => {
  return box({
    content,
    visibility: compute(selectedIndex, (selected) =>
      getElementVisibility(selected === index)
    ),
  });
};
