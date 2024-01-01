import * as yup from "yup";
import { AsYouType, isValidNumber } from "libphonenumber-js";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

export const validationSchema = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .matches(/^[A-Za-zÀ-ȕ ]+$/, "Full Name should only contains letters"),
  contactNumber: yup
    .string()
    .required("Contact number is required")
    .test(
      "valid-canadian-number",
      "Invalid Canadian phone number format",
      function (value) {
        const phoneNumber = new AsYouType("CA").input(value);
        return isValidNumber(phoneNumber, "CA");
      }
    ),
  day: yup
    .number()
    .required("Day is required")
    .test(
      "not-greater-than-current-day",
      "Day must not be greater than the current date (day)",
      function (value) {
        const { month, year } = this.parent;
        if (year == undefined || month == undefined)
          return true;
        if (
          year != undefined &&
          year == currentYear &&
          month != undefined &&
          month == currentMonth &&
          value > currentDay
        ) {
          return false;
        } else {
          return true;
        }
      }
    ),
  month: yup
    .string()
    .required("Month is required")
    .test(
      "not-greater-than-current-month",
      "Month must not be greater than the current date (month)",
      function (value) {
        const currentDate = new Date();
        const { day, year } = this.parent;
        const selectedDate = new Date(
          year,
          value - 1,
          day
        ); // Month is 0-indexed in JavaScript dates
        
        if (day == undefined || year == undefined)
          return true;
        if (
          year != undefined &&
          year == currentYear &&
          day != undefined &&
          day == currentDay &&
          value > currentMonth
        ) {
          return false;
        } else {
          return true;
        }
      }
    ),
  year: yup
    .string()
    .required("Year is required")
    .test(
      "not-greater-than-current-year",
      "Birthdate must not be greater than the current date",
      function (value) {
        const { day, month } = this.parent;
        if (
          day != undefined &&
          day > currentDay &&
          month != undefined &&
          month > currentMonth &&
          value == currentYear
        ) {
          return false;
        }

        return value <= currentYear;
      }
    ),
  email: yup
    .string()
    .email("Sorry, this email address is not valid")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
      "Sorry, this email address is not valid"
    )
    .required("Email address is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and be 8 characters long"
    )
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});
