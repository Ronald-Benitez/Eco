import daysHandler, { DaysHandler } from "../db/days-handler";

const useDb = () => {
  const useDays = daysHandler() as DaysHandler;

  return {
    useDays,
  };
};

export default useDb;
