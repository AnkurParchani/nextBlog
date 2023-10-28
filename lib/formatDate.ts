const formatDate = (dateToFormat: string): formattedDateType => {
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateToFormat);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const monthNum = date.getUTCMonth();
  const year = String(date.getUTCFullYear());

  const month = monthName[monthNum];

  return { day, month, year };
};
export default formatDate;
