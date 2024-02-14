import * as events from "../helpers/events";
import { getElementVisibility } from "../helpers/flexHelper";
import {
  WidgetCreator,
  FlexiblePosition,
  Parsed,
  groupbox,
  horizontal,
  label,
  compute,
  Store,
} from "openrct2-flexui";

/**
 * Creates a stat widget with the given properties.
 *
 * @param {string} props.title - The title of the stat widget.
 * @param {Store<T>} props.gameStatStore - The statistic store with values for the entire game.
 * @param {Store<T>} props.parkStatStore - The park stat store with values for the current park.
 * @param {(stat: T) => string} [props.processStat] - Optional function to process the stat value.
 * @returns {WidgetCreator<FlexiblePosition>} The created stat widget.
 */
export function createStatWidget<T>(props: {
  /** The title of your widget */
  title: string;
  /** The store with total game stat values*/
  gameStatStore: Store<T>;
  /** The store with this park stat values*/
  parkStatStore: Store<T>;
  /** Optional function to process the stat value,
   * e.g. to process time in seconds into nice human-readable text*/
  processStat?: (stat: T) => string;
}): WidgetCreator<FlexiblePosition> {
  const { title, gameStatStore, parkStatStore, processStat } = props;

  return groupbox({
    text: `${title}`,
    content: [
      getGameStatWidget(gameStatStore, processStat),
      getParkStatWidget(parkStatStore, processStat),
    ],
  });
}

function getGameStatWidget<T>(
  statStore: Store<T>,
  processStat?: (stat: T) => string
): WidgetCreator<FlexiblePosition, Parsed<FlexiblePosition>> {
  return horizontal([
    label({ text: "OpenRCT2 -" }),
    label({
      text: compute(statStore, (value) =>
        processStat ? processStat(value) : JSON.stringify(value)
      ),
    }),
  ]);
}

function getParkStatWidget<T>(
  statStore: Store<T>,
  processStat?: (stat: T) => string
): WidgetCreator<FlexiblePosition, Parsed<FlexiblePosition>> {
  const parkNameFormat = (name: string) => `"${name}" -`;

  const isVisible = compute(events.isInPark, (isInPark) =>
    getElementVisibility(isInPark)
  );

  return horizontal([
    label({
      text: compute(events.parkName, (name) => parkNameFormat(name)),
      visibility: isVisible,
    }),
    label({
      text: compute(statStore, (value) =>
        processStat ? processStat(value) : JSON.stringify(value)
      ),
      visibility: isVisible,
    }),
  ]);
}
