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
              crashesInDayDescription(vehiclesCrashedGameStore, 0),
              crashesInDayDescription(vehiclesCrashedGameStore, 1),
              crashesInDayDescription(vehiclesCrashedGameStore, 2),
              // crashesListview(vehiclesCrashedGameStore),
            ],
          }),
        ],
      }),
    ],
  });
};

const crashesInDayDescription = (
  vehiclesCrashed: WritableStore<VehicleCrashStat[]>,
  daysBeforeToday: number
) => {
  return label({
    text: compute(vehiclesCrashed, (crashes) => {
      const properDate = new Date();
      properDate.setDate(properDate.getDate() - daysBeforeToday);
      const crashesToday = crashes.filter((crash) => {
        return (
          new Date(crash.dateTime as unknown as string).getDate() ===
          properDate.getDate()
        );
      });
      return `Crashes ${
        daysBeforeToday === 0 ? `today` : `${daysBeforeToday} days ago`
      }: ${crashesToday.length.toString()}`;
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
