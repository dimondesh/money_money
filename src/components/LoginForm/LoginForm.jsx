// import { logIn } from "../../redux/auth/operations.js";
import { loginThunk } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormButton from "../common/FormButton/FormButton";
import LoginValidatiSchema from "../../../helpers/LoginValidatiSchema";

import "react-toastify/dist/ReactToastify.css";

import css from "./LoginForm.module.css";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be at most 12 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    const action = await dispatch(loginThunk(values));
    if (loginThunk.fulfilled.match(action)) {
      navigate("/dashboard");
      resetForm();
    }
  };

  return (
    <div className={css.FormWrapper}>
      <div className={css.FormCard}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginValidatiSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              autoComplete="off"
              className={css.form}
            >
              <div className={css.logoBlock}>
                <img
                  src="/money-guard.svg"
                  alt="MoneyGuard logo"
                  className={css.logo}
                  width="36"
                  height="36"
                />
                <h2 className={css.logoText}>MoneyGuard</h2>
              </div>

              <div className={css.inputGroup}>
                <div
                  className={`${css.inputBorderWrap} ${
                    formik.errors.email && formik.touched.email
                      ? css.errorBorder
                      : ""
                  }`}
                >
                  <svg
                    className={css.icon}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z"
                      fill="white"
                    />
                  </svg>

                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={css.input}
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />
              </div>

              {/* Password */}
              <div className={css.inputGroup}>
                <div
                  className={`${css.inputBorderWrap} ${
                    formik.errors.password && formik.touched.password
                      ? css.errorBorder
                      : ""
                  }`}
                >
                  <svg
                    className={css.icon}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17ZM17 8H16V6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6V8H7C5.89543 8 5 8.89543 5 10V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V10C19 8.89543 18.1046 8 17 8ZM10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6V8H10V6Z"
                      fill="white"
                    />
                  </svg>

                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={css.input}
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.error}
                />
              </div>

              {/* Buttons */}
              <FormButton type="submit" className={css.formBtn}>
                Log in
              </FormButton>
              <FormButton isLink to="/register" className={css.registerBtn}>
                Register
              </FormButton>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
