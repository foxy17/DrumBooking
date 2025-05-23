import dayjs from "dayjs";

export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export const getTodayDayName = () => {
  const day = dayjs().format("dddd");
  return day;
};

export const getMonthName = () => {
  const month = dayjs().format("MMM");
  return month;
};

export const getDayNum = () => {
  const day = dayjs().format("DD");
  return day;
};

export const getMonthNum = () => {
  const month = dayjs().format("MM");
  return month;
};
