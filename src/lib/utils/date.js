export const formatDate = (date, format = "short") => {
  const dateObj = new Date(date);
  switch (format) {
    case "short":
      return dateObj.toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
  }
};
