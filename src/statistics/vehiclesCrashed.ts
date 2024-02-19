import {
  FlexiblePosition,
  WidgetCreator,
  WritableStore,
  store,
} from "openrct2-flexui";
import { Statistic } from "../objects/Statistic";
import { getVehiclesCrashedExtendedDisplay } from "../window/extendedDisplays/vehiclesCrashedExtended";

const STATISTIC_KEY = "vehiclesCrashed";
const STATISTIC_TITLE = "Vehicle Crashes";

// i thought it would be interesting to track the date and time of the crash
// it could potentially be diplayed in a different widget format
export type VehicleCrashStat = VehicleCrashArgs & {
  dateTime: Date;
};

const subscribeToVehicleCrashesHook = (
  updatedValueCallback: (vehicleCrashedStat: VehicleCrashStat) => void
) => {
  context.subscribe("vehicle.crash", (e) => {
    updatedValueCallback({
      id: e.id,
      crashIntoType: e.crashIntoType,
      dateTime: new Date(),
    });
  });
};

// when a new crash happens, we want to add it to the list of crashes
function accumulateNewCrashedVehicle(
  newCrash: VehicleCrashStat,
  existingVehiclesCrashed: VehicleCrashStat[]
) {
  return [...existingVehiclesCrashed, newCrash];
}

export const vehiclesCrashedStatistic = () => {
  const key = STATISTIC_KEY;
  const title = STATISTIC_TITLE;

  const statistic = new Statistic(
    key,
    title,
    [],
    subscribeToVehicleCrashesHook,
    accumulateNewCrashedVehicle,
    formatDisplay
  );

  statistic.extendedDisplay = getVehiclesCrashedExtendedDisplay(
    statistic.gameStatStore,
    statistic.parkStatStore
  );

  return statistic;
};

function formatDisplay(ridesBuilt: VehicleCrashStat[]): string {
  const numberOfCrashedVehicles = Object.keys(ridesBuilt).length;
  return `${numberOfCrashedVehicles}`;
}
