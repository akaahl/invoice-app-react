import * as Yup from "yup";

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
    const newDateString = `${newDateArray[1]} ${newDateArray[2]}, ${newDateArray[0]}`;
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

export const formatDatePicker = (date) => {
  const dateArr = date.toLocaleDateString().split("/");
  return `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`;
};

export const validationSchema = Yup.object({
  streetAddress: Yup.string().required(),
  city: Yup.string().required(),
  postCode: Yup.string().required(),
  country: Yup.string().required(),
  clientName: Yup.string().required(),
  clientEmail: Yup.string().email().required(),
  clientStreetAddress: Yup.string().required(),
  clientCity: Yup.string().required(),
  clientPostCode: Yup.string().required(),
  clientCountry: Yup.string().required(),
  invoiceDate: Yup.date().required(),
  paymentTerms: Yup.string().required(),
  description: Yup.string().required(),
});

export const initialValues = {
  streetAddress: "",
  city: "",
  postCode: "",
  country: "",
  clientName: "",
  clientEmail: "",
  clientStreetAddress: "",
  clientCity: "",
  clientPostCode: "",
  clientCountry: "",
  invoiceDate: new Date(),
  paymentTerms: "Net 1 Day",
  description: "",
  itemList: [{ itemName: "", quantity: "", price: "", total: "" }],
};
