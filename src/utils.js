export const formatDate = (date, formDate) => {
  const convertToMonthName = (month) => {
    switch (month) {
      case "01":
        return "Jan";
      case "02":
        return "Feb";
      case "03":
        return "Mar";
      case "04":
        return "Apr";
      case "05":
        return "May";
      case "06":
        return "Jun";
      case "07":
        return "Jul";
      case "08":
        return "Aug";
      case "09":
        return "Sep";
      case "10":
        return "Oct";
      case "11":
        return "Nov";
      case "12":
        return "Dec";
      default:
        return null;
    }
  };

  if (formDate) {
    const newDateArray = date
      .split("/")
      .map((num, index) => (index === 1 ? convertToMonthName(num) : num));
    const newDateString = `${newDateArray[1]} ${newDateArray[0]}, ${newDateArray[2]}`;
    return newDateString;
  } else {
    const newDate = date
      .split("-")
      .map((num, index) => (index === 1 ? convertToMonthName(num) : num))
      .reverse()
      .join(" ");
    return newDate;
  }
};
