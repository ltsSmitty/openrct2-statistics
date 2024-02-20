import {
  WritableStore,
  vertical,
  label,
  compute,
  groupbox,
  tab,
  TabCreator,
  listview,
} from "openrct2-flexui";
import { VehicleCrashStat } from "../../statistics/vehiclesCrashed";

export const vehiclesCrashedExtendedDisplayTab = (
  vehiclesCrashedGameStore: WritableStore<VehicleCrashStat[]>,
  _vehiclesCrashedParkStore: WritableStore<VehicleCrashStat[]>
): TabCreator => {
  return tab({
    image: 5164,
    content: [
      groupbox({
        text: "Vehicle Crash Statistics",
        content: [
          vertical({
            content: [
              crashesTodayDescription(vehiclesCrashedGameStore),
              crashesListview(vehiclesCrashedGameStore),
            ],
          }),
        ],
      }),
    ],
  });
};

const crashesTodayDescription = (
  vehiclesCrashed: WritableStore<VehicleCrashStat[]>
) => {
  return label({
    text: compute(vehiclesCrashed, (crashes) => {
      const today = new Date();
      const crashesToday = crashes.filter((crash) => {
        return (
          new Date(crash.dateTime as unknown as string).getDate() ===
          today.getDate()
        );
      });
      return `Crashes today: ${crashesToday.length.toString()}`;
    }),
  });
};

const crashesListview = (
  vehiclesCrashed: WritableStore<VehicleCrashStat[]>
) => {
  const l = listview({
    items: compute(vehiclesCrashed, (crashes) =>
      crashes.map((crash) => JSON.stringify(crash))
    ),
    columns: [{ header: "Vehicle" }],
  });
  return l;
};
