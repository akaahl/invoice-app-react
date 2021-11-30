# Frontend Mentor - Invoice App Solution

This is my solution to the [Invoice App challenge on Frontend Mentor](). This app has a full CRUD (create, read, update, delete) functionality, that allows user to click and read invoices, create new ones, update and delete them. User may also filter invoices based on their status. Other features include form management and validation with Formik and Yup (herein lies most of the diffulties during the development process), global state management with Redux, dynamic routing with React Router Dom, micro-animation interactions with Framer Motion, and Local Storage Web API to store the updated data. It is also fully responsive, and looks amazing across all screens' dimensions.

## How It Works (GIF)

![Home page]()

## Demo Link

- Live Site URL: [Invoice App Live Demo](https://invoice-app-react-six.vercel.app/)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete invoice
- Receive form validations when trying to create/edit invoice
- Filter invoices by status
- Bonus: Keep track of any changes, even after refreshing the browser (localStorage could be used for this if you're not building out a full-stack app)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- [React](https://reactjs.org/) - JS library
- [React Redux](https://react-redux.js.org/) - For global state management in React
- [Redux Thunk](https://github.com/reduxjs/redux-thunk) - To handle asynchronous logic interaction with redux store
- [React Router Dom](https://www.npmjs.com/package/react-router-dom) - To handle routing (dynamic) in React
- [Styled Components](https://styled-components.com/) - For styling and custom props handling
- [Framer Motion](https://www.framer.com/motion/) - For micro interaction animations throughout the app
- [Formik](https://formik.org/) - A form management library for React
- [Formik Focus Error](https://github.com/tiaanduplessis/formik-error-focus) - Scroll to the first error in your Formik form and set focus onto the input element
- [Yup](https://www.npmjs.com/package/yup) - To be used in conjunction with Formik; a client-side Javacript schema builder for value parsing and validation. It can validates email, strings, numbers, and so forth, along with many useful features.
- [React DatePicker]() - A React library to handle date selections with numerous features.

### What I learned

This is actually my second time of building this app. I have exactly done this project previously with vanilla Javascript. However, I have decided to build it again this time around with React JS, to further strengthen my knowledge grip on the framework. Besides, there are some things that I wished to change, such as the layout and font sizes, media queries and so forth. Additionally, the previous one was quite static, with no implementations on saving data in the Web Storage. Hence, I've worked out on some of the things that needed more attentions and the result is much more polished. Below are some of things that I have learned during the development process:-

#### Implementing React Datepicker library

Since this was my first time using the library, I had to scourge through both of the Formik and React DatePicker documentations on how to properly weave them together to create a workable solution. My initial concern was how to build a custom input element (date picker) that aligns with the rest of styling, and the default styling from React DatePicker was far from the one I want to incorporate with. The solution that I found was to create a separate custom component for the date picker using forwardRef hook, and then render it as a child within the Formik's Field component.

```
import React, { forwardRef } from "react";
import { formatDate } from "../../utils";
import calendarIcon from "../../assets/images/icon-calendar.svg";

const DatePickerInput = forwardRef(({ value, onClick }, ref) => {
  return (
    <button
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="custom-date-picker"
    >
      {formatDate(value, true)}
      <img src={calendarIcon} alt="calendar icon" />
    </button>
  );
});

export default DatePickerInput;
```

As can be seen above, by creating a composable custom component, I am able to use custom image/icon as well as text placeholder to create the necessary styling effect. The "onClick" prop is then passed as a click event handler to manage the mount/unmount of the date picker itself.

```
import {Field} from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerInput from "./DatePickerInput";

<Field name={name}>
    {({ form, field }) => {
        const { setFieldValue } = form;
        const { value } = field;

        return (
            <DatePicker
            id="invoiceDate"
            selected={value}
            onChange={(date) => setFieldValue("invoiceDate", date)}
            dateFormat="yyyy/MM/dd"
            customInput={<DatePickerInput />}
            />
            );
    }}
</Field>
```

The custom DatePickerInput is then used as the "customInput" prop's value, to facilitates the appearance of the DatePickerInput component. Meanwhile, at top level, the Field component renders a child component, which in this case is the DatePicker, and overflows in the necessary props such as the "setFieldValue" and "value" props towards the DatePicker. This is to ensure that the core functionality of setting form input values is available in the DatePicker component itself, and thereby keeping the all the input values in sync with the rest of the form.

#### Adding items dynamically in Formik

Typically in Formik, the Field component is normally used to render any kinds of input type elements. But in a particular use case where the users may want to add a new input field or element dynamically, it is better to use the FieldsArray component as it allows the adding/removal of input elements. Both the FieldsArray and Field can be used together to achieve this result.

```
    <ItemList
        errors={errors}
        touched={touched}
        setItemListError={setItemListError}
        selectedItems={selectedInvoice ? selectedInvoice.items : ''}
        setFieldValue={setFieldValue}
    />
```

The ItemList component housed the FieldArray and its children in entirety. It has several props that I will get to later on.

```
const ItemList = ({
  errors,
  touched,
  setItemListError,
  selectedItems,
  setFieldValue,
}) => {
  useEffect(() => {
    if (selectedItems) {
      setFieldValue('itemList', selectedItems);
    }
  }, [selectedItems, setFieldValue]);
  return (
    <FieldArray name="itemList">
      {fieldArrayProps => {
        const { push, remove, form } = fieldArrayProps;
        const { values } = form;
        const { itemList } = values;

        return (
          <>
            <ul>
              {itemList &&
                itemList.map((item, index) => {
                  const totalPrice = +itemList[index].price * +itemList[index].quantity;

                  return (
                    <li key={index}>
                      <InputWrapper
                        isFieldArray={true}
                        classname="item-name"
                        textContent="Item name"
                        name="name"
                        errors={errors}
                        touched={touched}
                        index={index}
                        selectedItems={selectedItems}
                      />

                      ...... More code goes here

                      <button type="button" onClick={() => remove(index)}>
                        <DeleteIcon />
                      </button>
                    </li>
                  );
                })}
            </ul>
            <button
              type="button"
              className="add-new-btn"
              onClick={() => {
                push({
                  name: '',
                  quantity: '',
                  price: '',
                  total: 0,
                });
                setItemListError(false);
              }}
            >
              <img src={plusIcon} alt="plus icon" />
              Add New Item
            </button>
          </>
        );
      }}
    </FieldArray>
  );
};

export default ItemList;
```

The code snippets above illustrates on how to implement FieldsArray component to achieve the dynamic adding/removal result. FieldsArray renders a React fragment which houses the entire "ul" and its children. In addition, the "push" and "remove" methods are destructured from the "fieldsArrayProps", which are then used within the click handler's event function. The index of the "li" element is then used as an argument for the "push" and "remove" method, to add/remove the specfic item. Overall, the setup is fairly straightforward and intuitive, thanks to Formik.

#### Loading saved input values when editing the form

In many instances, users may want to edit or update the form that they have saved. And it can be useful and provides a good user experience that all form fields are pre-filled with the saved values when users click the edit button. By using Formik's "setFieldValues" method, we can seamlessly set any Field component value when the form loads.

```
const params = useSelector(state => state.root.invoiceId);
const selectedInvoice = JSON.parse(
  localStorage.getItem('invoiceStorage')
).filter(invoice => invoice.id === params)[0];

.........

return (
  .........
  <InputWrapper
    classname="street-address"
    textContent="Street Address"
    name="streetAddress"
    errors={errors}
    touched={touched}
    value={
      selectedInvoice
        ? selectedInvoice.senderAddress.street
        : ''
    }
    setFieldValue={setFieldValue}
  />

)
```

I first get the params value from the redux global store (I set this value whenever I go into a specific invoice page), and subsequently used it as a filter for when I fetched the entire data from local storage. Then, the "selectedInvoice" data is passed down as a prop into the InputWrapper component. Note that, I used conditional rendering to indicate that if the "selectedInvoice" is true (exists), it signifies that the user wants to edit the form.

```
const InputWrapper = ({......, setFieldValue, value, name}) => {
  .......

  useEffect(() => {
     if (value && setFieldValue) {
      setFieldValue(name, value);
    }
    ............
  }, [setFieldValue, value])

 return (
   ..........
   Children goes here
 )
}
```

Inside the InputWrapper component, the useEffect hook is used to dynamically pre-filled the relevant Fields' input values whenever the component first loads. This is achieved by using the "setFieldValue" function which allows the value for any specific input to be changed, by providing the name of the input, and the new values. The final result will be as expected; the forms are now pre-filled with the previous saved values.

I would like to also point out a mistake that I made prior to coming up with this solution, which is directly setting Field's component "value" prop, instead of using the "setFieldValue". Sure, the previously saved data will be displayed correctly in the UI. But users will not be able to change the value itself when they clicked onto the element as the value is "hard-coded" so to speak. And the onChange handler will not be able to capture any changes happening within the input element.

#### UUID bugs when using Framer Motion staggerChildren effect

This is a reminder to my future self not to use UUID as a key prop when rendering an array into the UI. I've encountered many situations where I just can't seem to figure out why the staggerChildren effect is not working as it should, not just in this project but also my previous ones. It did not occur to me initially that UUID might be the elusive culprit, but after removing and changing every bits of the values, the answer presents itself. Take a look below:-

```
const ulVariants = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const liVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <StyledList variants={ulVariants} initial="initial" animate="animate">
      {data.length && (
        data.map(
          (
            { id, paymentDue, clientName, total, status, clientAddress },
            index
          ) => (
            <StyledInvoice
              key={index}  =========> using uuidv4() will not work
              status={status}

              variants={liVariants}
            >
              .........
            </StyledInvoice>
          )
        )
      )}
    </StyledList>
  )
```

Inside the StyledInvoice, I've set the array index as the key prop value rather than using uuidv4() generated value. If I were to use the latter, none of the child elements will have the stagger animation effect. I think, this is partly due to Framer Motion algorithm that uses the array index key prop value to calculate the "delay" effect of each StyledInvoice component.

```
<StyledInvoice
  key={index}
  variants={{
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: index * 0.3,
      },
    },
}}
>
  .........................
</StyledInvoice>
```

The above code is normally how the stagger effect is done without using the "staggerChildren". It wouldn't make sense for the uuid generated value to be used to calculate the delay as it is a series of random alphabets and numbers. Hence, the reason of why I think it is not working. This is just a theory of mine, not a hard-stated fact by itself. I just wished Framer Motion would log any error output to the console to indicate that a particular setting is not allowed or some sorts, to save myself from countless of hours debugging.

### Continued Development

In the future, I might add the backend functionality with user authentication, hence turning it into a full-stack application. Some stacks that I have in mind include MongoDB for database, and OAuth for authentication. But for now, the app seems sufficient as it is and fully functional.

### Useful resources

- [Formik Tutorial](https://www.youtube.com/playlist?list=PLC3y8-rFHvwiPmFbtzEWjESkqBVDbdgGu) - This is a great in-depth tutorial on Formik. It teaches the most basic way of using Formik all the to the advanced level. It also includes Yup integration with Formik. This is truly a great resource.

## Author

You may reach out to me on the following links:-

- Frontend Mentor - [@akaahl](https://www.frontendmentor.io/profile/akaahl)
- Twitter - [@akaahl1](https://twitter.com/akaahl1)

Hope to connect with you all and chat! :D

## Acknowledgments

A special thanks goes out to ApplePieGiraffe from the FrontEndMentor community. This app build is based on his own rendition of the challenge, and I've set out to somewhat mimic some of the micro animations he/she used. It works out beautifully in the end. And last but not least, to FrontEnd Mentor yet again for creating this awesome looking Guru level challenge. I've created a lot projects based on their challenges, and the Advanced and above level really push me to my limits. It goes without saying that I am getting better progressively by doing their challenges. Thank you FEM!
