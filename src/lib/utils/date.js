export const formatDate = (date, format = "short") => {
  const dateObj = new Date(date);
  let hh = dateObj.getHours();
  let mm = dateObj.getMinutes();

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;

  const curr_time = hh + ":" + mm;
  switch (format) {
    case "short":
      return dateObj.toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
    case "time":
      return curr_time;
  }
};
