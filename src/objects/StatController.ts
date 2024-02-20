import { TabCreator } from "openrct2-flexui";
import { Statistic } from "./Statistic";

/**
 * Represents a controller for managing statistics.
 */
export class StatController {
  statistics: Statistic<any, any>[] = [];

  /**
   * Gets an array of widgets associated with the statistics.
   */
  get widgets() {
    return this.statistics.map((stat) => stat.widget);
  }

  get extendedDisplayTabs() {
    return (
      this.statistics
        .map((stat) => stat.extendedDisplayWidget)
        // need to cast because TS isn't smart enough to know that the filter removes undefined
        .filter((widget) => widget !== undefined) as TabCreator[]
    );
  }

  /**
   * Adds a statistic to the controller.
   * @param stat The statistic to add.
   * @returns The updated StatController instance.
   */
  add(stat: Statistic<any, any>) {
    this.statistics.push(stat);
    return this;
  }

  /**
   * Resets the game statistics by setting their values to the reset value.
   */
  resetGameStatistics() {
    this.statistics.forEach((stat) => {
      stat.gameStatStore.set(stat.resetValue);
    });
  }

  /**
   * Resets the park statistics by setting their values to the reset value.
   */
  resetParkStatistics() {
    this.statistics.forEach((stat) => {
      stat.parkStatStore.set(stat.resetValue);
    });
  }
}
