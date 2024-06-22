// import { useFormik } from "formik";
import * as Yup from "yup";


 export const personalInfoValidation = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    mobileNo: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
  });
