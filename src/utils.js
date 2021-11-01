import * as Yup from 'yup';

export const formatDate = (date, formDate) => {
  const convertToMonthName = month => {
    switch (month) {
      case '01':
        return 'Jan';
      case '02':
        return 'Feb';
      case '03':
        return 'Mar';
      case '04':
        return 'Apr';
      case '05':
        return 'May';
      case '06':
        return 'Jun';
      case '07':
        return 'Jul';
      case '08':
        return 'Aug';
      case '09':
        return 'Sep';
      case '10':
        return 'Oct';
      case '11':
        return 'Nov';
      case '12':
        return 'Dec';
      default:
        return null;
    }
  };

  if (formDate) {
    const newDateArray = date
      .split('/')
      .map((num, index) => (index === 1 ? convertToMonthName(num) : num));
    const newDateString = `${newDateArray[1]} ${newDateArray[2]}, ${newDateArray[0]}`;
    return newDateString;
  } else {
    const newDate = date
      .split('-')
      .map((num, index) => (index === 1 ? convertToMonthName(num) : num))
      .reverse()
      .join(' ');
    return newDate;
  }
};

export const formatDatePicker = date => {
  const dateArr = date.toLocaleDateString().split('/');
  return `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`;
};

export const randomIdGenerator = () => {
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const randomLetter = () => Math.floor(Math.random() * alphabets.length);
  const randomNum = () => Math.floor(Math.random() * 10);

  const randomId = `${alphabets[randomLetter()]}${
    alphabets[randomLetter()]
  }${randomNum()}${randomNum()}${randomNum()}${randomNum()}`;

  return randomId;
};

export const getTotal = arr => {
  return arr.reduce((acc, val) => (acc += +val.price * +val.quantity), 0);
};

export const generatePaymentTerms = str => {
  switch (str) {
    case 'Net 1 Day':
      return 1;
    case 1:
      return 'Net 1 Day';
    case 'Net 7 Days':
      return 7;
    case 7:
      return 'Net 7 Days';
    case 'Net 14 Days':
      return 14;
    case 14:
      return 'Net 14 Days';
    case 'Net 30 Days':
      return 30;
    case 30:
      return 'Net 30 Days';
    default:
      return 1;
  }
};

export const generatePayDue = (dateString, paymentTerm) => {
  const dateArray = dateString.split('-');
  const currentDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
  currentDate.setDate(currentDate.getDate() + paymentTerm);

  const year = currentDate.getFullYear() + '';
  const month = currentDate.getMonth() + 1 + '';
  const date = currentDate.getDate() + '';
  const output = `${year}-${month < 10 ? '0' + month : month}-${date}`;

  return output;
};

export const compareDate = (paymentDue, today) => {
  const dueArr = paymentDue.split('-');
  const dueDate = new Date(dueArr[0], dueArr[1] - 1, dueArr[2]);

  return dueDate >= today ? 'pending' : 'paid';
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
  itemList: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required(),
        quantity: Yup.number().required().positive().integer().min(0),
        price: Yup.number().required().positive().min(0),
        total: Yup.number().required().positive().min(0),
      })
    )
    .required(),
});

export const initialValues = {
  streetAddress: '',
  city: '',
  postCode: '',
  country: '',
  clientName: '',
  clientEmail: '',
  clientStreetAddress: '',
  clientCity: '',
  clientPostCode: '',
  clientCountry: '',
  invoiceDate: new Date(),
  paymentTerms: 'Net 1 Day',
  description: '',
  itemList: [],
};
