import * as yup from "yup";

const registerValidatSchema = yup.object().shape({
  username: yup.string().required("Name is required"), 
  email: yup
    .string()
    .email("Invalid email address") 
    .required("Email is required"), 
  password: yup.string().min(6).max(12).required("Password is required"), 
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match") 
    .required("Password confirmation is required"), 
});


export default registerValidatSchema;