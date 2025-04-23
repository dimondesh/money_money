import * as yup from "yup";

const registerValidatSchema = yup.object().shape({
  name: yup.string().required("Name обов’язкове"),
  email: yup
    .string()
    .email("Невірна email адреса")
    .required("Email обов’язковий"),
  password: yup.string().min(6).max(12).required("Пароль обов’язковий"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Паролі не співпадають")
    .required("Підтвердження обов’язкове"),
});

export default registerValidatSchema;
