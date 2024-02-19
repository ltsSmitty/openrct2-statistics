import {
  WritableStore,
  WidgetCreator,
  FlexiblePosition,
  horizontal,
  vertical,
  label,
  compute,
} from "openrct2-flexui";
import { VehicleCrashStat } from "../../statistics/vehiclesCrashed";

export const getVehiclesCrashedExtendedDisplay = (
  vehiclesCrashedGameStore: WritableStore<VehicleCrashStat[]>,
  vehiclesCrashedParkStore: WritableStore<VehicleCrashStat[]>
): WidgetCreator<FlexiblePosition> => {
  const widget = vertical({
    content: [
      label({
        text: "Crashes today",
      }),
      label({
        text: compute(
          vehiclesCrashedGameStore,
          vehiclesCrashedParkStore,
          (crashesG, crashesP) => {
            const crashes = crashesG.concat(crashesP);
            const today = new Date();
            const crashesToday = crashes.filter((crash) => {
              return (
                new Date(crash.dateTime as unknown as string).getDate() ===
                today.getDate()
              );
            });
            return crashesToday.length.toString();
          }
        ),
      }),
    ],
  });
  return widget;
};
