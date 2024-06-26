import { TSchedule } from './offeredC.interface';

export const hasTimeConflict = (
  assignSchedule: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (const schedule of assignSchedule) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      console.log('yes');
      return true;
    }
  }
  return false;
};
